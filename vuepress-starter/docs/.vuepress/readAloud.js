/**
 * Read-aloud ("Listen") feature for the docs.
 *
 * Adds a floating control bar that reads the page content aloud using the
 * browser's built-in Speech Synthesis API, and highlights the line/sentence
 * currently being spoken. Click a highlighted line to jump the narration there.
 *
 * - No external dependencies; works offline.
 * - SSR-safe: nothing touches `window` until setupReadAloud() is called on the client.
 * - Reads prose (headings, paragraphs, list items, blockquotes, table cells)
 *   and skips fenced code blocks so it doesn't read symbols aloud.
 */

export function setupReadAloud(router) {
  if (typeof window === 'undefined') return;
  if (window.__readAloudAdded) return;

  const synth = window.speechSynthesis;
  // Feature-detect: if the browser has no speech synthesis, do nothing.
  if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') return;

  window.__readAloudAdded = true;

  // ---- Tunables ---------------------------------------------------------
  const RATES = [1, 1.25, 1.5, 0.75]; // cycled by the speed button
  const LANG = document.documentElement.lang || 'en-US';
  const MAX_CHUNK = 220; // characters; keeps each utterance short (avoids the
                         // ~15s Chrome cutoff bug and gives tight highlighting)

  // ---- State ------------------------------------------------------------
  let chunks = [];        // [{ node, text }]
  let current = 0;
  let rateIdx = 0;
  let paused = false;
  let stopped = true;
  let highlighted = null;
  let voice = null;
  let speakToken = 0;     // invalidates callbacks from cancelled/stale utterances

  // ---- Styles (injected once) ------------------------------------------
  injectStyles();

  // ---- Pick an English voice when the list becomes available -----------
  function pickVoice() {
    const vs = synth.getVoices();
    voice =
      vs.find((v) => /en[-_]US/i.test(v.lang)) ||
      vs.find((v) => /^en/i.test(v.lang)) ||
      null;
  }
  pickVoice();
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = pickVoice;
  }

  // ---- Build the control bar -------------------------------------------
  const bar = document.createElement('div');
  bar.className = 'read-aloud-bar';

  const mainBtn = document.createElement('button');
  mainBtn.type = 'button';
  mainBtn.className = 'ra-main';

  const stopBtn = document.createElement('button');
  stopBtn.type = 'button';
  stopBtn.className = 'ra-stop ra-hidden';
  stopBtn.innerHTML = '&#9632;'; // square
  stopBtn.setAttribute('aria-label', 'Stop reading');
  stopBtn.setAttribute('title', 'Stop');

  const speedBtn = document.createElement('button');
  speedBtn.type = 'button';
  speedBtn.className = 'ra-speed ra-hidden';
  speedBtn.setAttribute('aria-label', 'Change reading speed');
  speedBtn.setAttribute('title', 'Reading speed');

  bar.appendChild(mainBtn);
  bar.appendChild(stopBtn);
  bar.appendChild(speedBtn);
  document.body.appendChild(bar);

  // ---- Wire up controls -------------------------------------------------
  mainBtn.addEventListener('click', () => {
    if (stopped) start();
    else if (paused) resume();
    else pause();
  });
  stopBtn.addEventListener('click', stop);
  speedBtn.addEventListener('click', () => {
    rateIdx = (rateIdx + 1) % RATES.length;
    updateSpeedLabel();
    // Apply immediately if we're mid-read by restarting the current chunk.
    if (!stopped && !paused) {
      synth.cancel();
      speakChunk(current);
    }
  });
  updateSpeedLabel();
  setState('idle');

  // Stop narration whenever the user navigates to another page.
  if (router && typeof router.afterEach === 'function') {
    router.afterEach(() => stop());
  }
  // Cancel any queued speech when the page unloads.
  window.addEventListener('beforeunload', () => synth.cancel());

  // ---- Core: collect readable lines from the page ----------------------
  function collect() {
    const root =
      document.querySelector('.theme-default-content') ||
      document.querySelector('.content__default') ||
      document.querySelector('main');
    chunks = [];
    if (!root) return;

    const selector = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,td';
    let nodes = Array.prototype.slice.call(root.querySelectorAll(selector));

    // Skip code blocks (don't read symbols aloud).
    nodes = nodes.filter((n) => !n.closest('pre'));
    // Keep only "leaf" blocks: drop a node if it contains another selected node
    // (e.g. a <blockquote> wrapping a <p>, or a loose <li> wrapping a <p>).
    nodes = nodes.filter(
      (n) => !nodes.some((other) => other !== n && n.contains(other))
    );
    // Drop empties.
    nodes = nodes.filter((n) => n.textContent.trim().length > 0);

    nodes.forEach((node) => {
      chunkText(node.textContent).forEach((text) => {
        chunks.push({ node: node, text: text });
      });
    });

    // Let the user click any line to start/jump narration there.
    nodes.forEach((node) => {
      if (node.__raClickable) return;
      node.__raClickable = true;
      node.classList.add('read-aloud-readable');
      node.addEventListener('click', () => {
        const idx = chunks.findIndex((c) => c.node === node);
        if (idx === -1) return;
        synth.cancel();
        stopped = false;
        paused = false;
        setState('playing');
        speakChunk(idx);
      });
    });
  }

  // Split text into short, sentence-ish chunks under MAX_CHUNK characters.
  function chunkText(raw) {
    const clean = raw.replace(/\s+/g, ' ').trim();
    if (!clean) return [];
    const sentences = clean.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [clean];
    const out = [];
    sentences.forEach((s) => {
      s = s.trim();
      while (s.length > MAX_CHUNK) {
        let cut = s.lastIndexOf(' ', MAX_CHUNK);
        if (cut < 80) cut = MAX_CHUNK;
        out.push(s.slice(0, cut).trim());
        s = s.slice(cut).trim();
      }
      if (s) out.push(s);
    });
    return out;
  }

  // ---- Playback ---------------------------------------------------------
  function start() {
    collect();
    if (!chunks.length) return;
    // Start from the first line at/after the top of the viewport.
    let startIdx = 0;
    for (let i = 0; i < chunks.length; i++) {
      const r = chunks[i].node.getBoundingClientRect();
      if (r.bottom > 80) {
        startIdx = i;
        break;
      }
    }
    stopped = false;
    paused = false;
    setState('playing');
    speakChunk(startIdx);
  }

  function speakChunk(i) {
    if (stopped) return;
    if (i >= chunks.length) {
      finish();
      return;
    }
    current = i;
    const chunk = chunks[i];
    highlight(chunk.node);

    const token = ++speakToken; // any earlier utterance's callbacks are now stale
    const u = new SpeechSynthesisUtterance(chunk.text);
    u.rate = RATES[rateIdx];
    u.lang = LANG;
    if (voice) u.voice = voice;
    u.onend = () => {
      if (token !== speakToken || stopped || paused) return;
      speakChunk(i + 1);
    };
    u.onerror = () => {
      if (token !== speakToken || stopped || paused) return;
      speakChunk(i + 1);
    };
    synth.speak(u);
  }

  function pause() {
    if (synth.speaking) {
      paused = true;
      synth.pause();
      setState('paused');
    }
  }

  function resume() {
    if (paused) {
      paused = false;
      synth.resume();
      setState('playing');
    }
  }

  function stop() {
    stopped = true;
    paused = false;
    synth.cancel();
    clearHighlight();
    setState('idle');
  }

  function finish() {
    stopped = true;
    paused = false;
    clearHighlight();
    setState('idle');
  }

  // ---- Highlighting -----------------------------------------------------
  function highlight(node) {
    if (highlighted === node) return;
    clearHighlight();
    highlighted = node;
    node.classList.add('read-aloud-highlight');
    node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function clearHighlight() {
    if (highlighted) {
      highlighted.classList.remove('read-aloud-highlight');
      highlighted = null;
    }
  }

  // ---- UI state ---------------------------------------------------------
  function setState(state) {
    if (state === 'idle') {
      mainBtn.innerHTML = '&#128266; Listen'; // speaker
      mainBtn.setAttribute('aria-label', 'Read this page aloud');
      mainBtn.setAttribute('title', 'Read this page aloud');
      stopBtn.classList.add('ra-hidden');
      speedBtn.classList.add('ra-hidden');
    } else if (state === 'playing') {
      mainBtn.innerHTML = '&#9208; Pause'; // pause
      mainBtn.setAttribute('aria-label', 'Pause reading');
      mainBtn.setAttribute('title', 'Pause');
      stopBtn.classList.remove('ra-hidden');
      speedBtn.classList.remove('ra-hidden');
    } else if (state === 'paused') {
      mainBtn.innerHTML = '&#9654; Resume'; // play
      mainBtn.setAttribute('aria-label', 'Resume reading');
      mainBtn.setAttribute('title', 'Resume');
      stopBtn.classList.remove('ra-hidden');
      speedBtn.classList.remove('ra-hidden');
    }
  }

  function updateSpeedLabel() {
    speedBtn.textContent = RATES[rateIdx] + 'x'; // e.g. "1x"
  }

  // ---- Injected CSS -----------------------------------------------------
  function injectStyles() {
    if (document.getElementById('read-aloud-styles')) return;
    const css = [
      '.read-aloud-bar{position:fixed;right:1.5rem;bottom:5rem;z-index:100;',
      'display:flex;gap:.4rem;align-items:center;justify-content:flex-end;}',
      '.read-aloud-bar button{height:2.8rem;min-width:2.8rem;padding:0 .9rem;',
      'border-radius:1.4rem;border:1px solid rgba(0,0,0,.12);background:#fff;',
      'color:#2c3e50;font-size:.95rem;font-weight:600;line-height:1;cursor:pointer;',
      'box-shadow:0 2px 10px rgba(0,0,0,.18);display:flex;align-items:center;',
      'justify-content:center;gap:.35rem;transition:transform .2s ease,',
      'background-color .3s ease,box-shadow .3s ease;}',
      '.read-aloud-bar button:hover{transform:scale(1.06);}',
      '.read-aloud-bar .ra-stop,.read-aloud-bar .ra-speed{padding:0;min-width:2.8rem;}',
      '.read-aloud-bar .ra-hidden{display:none;}',
      '.read-aloud-readable{cursor:pointer;border-radius:3px;',
      'transition:background-color .15s ease;}',
      '.read-aloud-readable:hover{background-color:rgba(66,185,131,.08);}',
      '.read-aloud-highlight{background:linear-gradient(transparent 58%,#ffe680 58%);',
      'box-shadow:0 0 0 3px rgba(255,213,79,.35);border-radius:3px;}',
      'html.dark .read-aloud-bar button{background:#2c2d34;border-color:#3a3b42;',
      'color:#e6e8eb;box-shadow:0 2px 10px rgba(0,0,0,.5);}',
      'html.dark .read-aloud-readable:hover{background-color:rgba(74,191,138,.12);}',
      'html.dark .read-aloud-highlight{background:linear-gradient(transparent 58%,',
      'rgba(74,191,138,.45) 58%);box-shadow:0 0 0 3px rgba(74,191,138,.3);}',
      '@media (max-width:419px){.read-aloud-bar{right:1rem;bottom:4.6rem;}}',
    ].join('');
    const style = document.createElement('style');
    style.id = 'read-aloud-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
}
