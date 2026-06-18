import { setupReadAloud } from './readAloud';

/**
 * Adds a floating dark-mode toggle button to every page.
 * - Persists the choice in localStorage under "theme".
 * - Toggles the "dark" class on <html>, which the styles in
 *   styles/index.styl react to.
 * The initial theme is applied by the head script in config.js so there
 * is no flash of light mode on load.
 *
 * Also initializes the read-aloud ("Listen") feature, which speaks the page
 * content aloud and highlights the line currently being spoken.
 */
export default ({ Vue, router }) => {
  // Skip during server-side rendering (no window/document there).
  if (typeof window === 'undefined') return;

  Vue.mixin({
    mounted() {
      // Set up the read-aloud control bar (no-op if already added or if the
      // browser lacks speech synthesis).
      setupReadAloud(router);

      // Only ever create one button, no matter how many components mount.
      if (window.__darkToggleAdded) return;
      window.__darkToggleAdded = true;

      const btn = document.createElement('button');
      btn.className = 'dark-mode-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Toggle dark mode');
      btn.setAttribute('title', 'Toggle dark mode');

      const updateIcon = () => {
        const isDark = document.documentElement.classList.contains('dark');
        btn.innerHTML = isDark ? '☀️' : '🌙'; // ☀️ / 🌙
      };
      updateIcon();

      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        try {
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {}
        updateIcon();
      });

      document.body.appendChild(btn);
    },
  });
};
