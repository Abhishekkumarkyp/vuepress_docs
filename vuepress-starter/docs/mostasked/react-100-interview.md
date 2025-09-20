---
title: "100 Most-Asked React Interview Questions (with code, analogies, and follow‑ups)"
description: "A concise but practical set of React interview Q&A for quick revision — includes code snippets, analogies, difference tables, and follow‑ups."
tags: [react, interview, javascript, frontend]
---

# 100 Most‑Asked React Interview Questions

> How to use this file: skim the **one‑liners** to refresh, expand the **answers** for details, and practice with the **follow‑ups**. Code examples are minimal and runnable.

---

## Foundations & Core Concepts

### 1) What is React?
**One‑liner:** A UI library for building component‑based views using declarative rendering and state.
**Analogy:** React is like a Lego set — components (bricks) snap together to build complex UIs.
**Follow‑ups:** Why “library” not “framework”? What does “declarative” mean in practice?

---

### 2) JSX — what and why?
**One‑liner:** JSX is a syntax sugar that compiles to `React.createElement(...)` calls.
**Example:**
```jsx
const el = <h1>Hello</h1>; // becomes React.createElement('h1', null, 'Hello')
```
**Analogy:** JSX is like a templating dialect embedded in JS — closer to “HTML in JS,” not “templates plus JS.”
**Follow‑ups:** Can React work without JSX? Pros/cons of JSX?

---

### 3) Virtual DOM and reconciliation
**One‑liner:** React diffs virtual trees and applies the minimal real DOM updates.
**Analogy:** Compare “before vs after” blueprints, then only renovate the changed rooms.
**Follow‑ups:** When is VDOM not a performance silver bullet?

---

### 4) Elements, nodes, and components — difference?
**Difference table:**
| Term | What it is | Example |
|---|---|---|
| **Node** | Anything React can render (string, number, element, null) | `"OK"` |
| **Element** | Immutable description of UI | `{type:'div', props:{}}` |
| **Component** | Function/class returning elements | `function App(){...}` |
**Follow‑ups:** When does React convert elements to nodes?

---

### 5) Props vs State
**Difference table:**
| | Props | State |
|---|---|---|
| Ownership | Parent‑controlled | Component‑owned |
| Mutability | Read‑only | Mutable (via setters) |
| Usage | Configure components | Track UI/data changes |
**Example:**
```jsx
function Hello({name}) {
  const [count, setCount] = React.useState(0);
  return <button onClick={()=>setCount(c=>c+1)}>{name} {count}</button>;
}
```
**Follow‑ups:** When would you lift state vs keep local?

---

### 6) Controlled vs Uncontrolled components
**Difference table:**
| | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | DOM (refs) |
| Validation | Easier | Manual |
| Performance | May re-render often | Fewer renders |
**Example (controlled):**
```jsx
const [v,setV] = React.useState("");
<input value={v} onChange={e=>setV(e.target.value)} />
```
**Follow‑ups:** When are uncontrolled inputs handy? (e.g., large forms, simple one‑offs)

---

### 7) Keys in lists — why unique?
**One‑liner:** Stable keys help React reconcile list items efficiently and correctly.
**Anti‑pattern:** Using array index as key when list order can change.
**Follow‑ups:** When is index key acceptable?

---

### 8) Conditional rendering patterns
**Example:**
```jsx
{isLoading ? <Spinner/> : items.length ? <List items={items}/> : <Empty/>}
```
**Patterns:** ternary, guard return, logical `&&`, render functions.
**Follow‑ups:** Tradeoffs among patterns?

---

### 9) Composition vs Inheritance
**One‑liner:** Prefer composing components and props (children, render props) over class inheritance.
**Example:**
```jsx
<Card><UserAvatar/></Card>
```
**Follow‑ups:** When would you use composition to avoid prop drilling?

---

### 10) Lifting state up
**One‑liner:** Move shared state to a common ancestor to synchronize siblings.
**Example:**
```jsx
function Parent(){
  const [val,setVal]=React.useState(0);
  return (<><A val={val}/><B onInc={()=>setVal(v=>v+1)}/></>);
}
```
**Follow‑ups:** When does lifting become global state?

---

## Hooks

### 11) What is a Hook?
**One‑liner:** A function that lets function components “hook into” React features (state, effects, refs).
**Follow‑ups:** Why only call hooks at top level?

---

### 12) Rules of Hooks
**One‑liner:** Call hooks at top level and only in React functions (not loops/conditions/regular JS).
**Why:** Ensures hook ordering is consistent between renders.

---

### 13) `useState` — setter forms
**One‑liner:** Pass a value or an updater function to avoid stale reads.
```jsx
const [c,setC]=useState(0);
setC(c+1);       // may be stale in batches
setC(prev=>prev+1); // safe
```
**Follow‑ups:** Why are state updates batched?

---

### 14) `useEffect` — dependencies and cleanup
**One‑liner:** Run side effects after render; specify dependencies to control when.
```jsx
useEffect(()=>{
  const id = setInterval(()=>setTick(t=>t+1), 1000);
  return ()=>clearInterval(id); // cleanup
}, []);
```
**Follow‑ups:** How to avoid stale closures?

---

### 15) `useMemo` vs `useCallback`
**Difference:**
- **useMemo(fn, deps)** caches a **computed value**.
- **useCallback(fn, deps)** caches a **function reference**.
**Follow‑ups:** When to avoid premature memoization?

---

### 16) `useRef` — two common uses
**One‑liner:** Hold mutable value across renders; access DOM nodes.
```jsx
const countRef = React.useRef(0); // mutable box
const inputRef = React.useRef();  // DOM ref
```
**Follow‑ups:** Why no re-render on ref changes?

---

### 17) Custom hooks — extracting logic
**One‑liner:** Package reusable stateful logic.
```jsx
function useOnline(){
  const [online,setOnline]=useState(navigator.onLine);
  useEffect(()=>{
    const on=()=>setOnline(true), off=()=>setOnline(false);
    window.addEventListener('online',on); window.addEventListener('offline',off);
    return ()=>{window.removeEventListener('online',on);window.removeEventListener('offline',off)};
  },[]);
  return online;
}
```
**Follow‑ups:** How to test custom hooks?

---

### 18) `useLayoutEffect` vs `useEffect`
**Difference:** `useLayoutEffect` runs **synchronously** after DOM mutations (paint is blocked); `useEffect` runs **after paint**.
**Follow‑ups:** When to prefer layout effect? (measure DOM, avoid flicker)

---

### 19) `useReducer` vs `useState`
**Difference:** `useReducer` centralizes updates for complex transitions; `useState` keeps state local and simple.
```jsx
function reducer(s,a){ switch(a.type){ case 'inc': return s+1; default: return s;} }
const [state,dispatch] = useReducer(reducer,0);
```
**Follow‑ups:** When to co-locate vs globalize state?

---

### 20) `useImperativeHandle` & `forwardRef`
**One‑liner:** Limit what parent can do imperatively with child refs.
```jsx
const Fancy = React.forwardRef((props,ref)=>{
  const inputRef = useRef();
  useImperativeHandle(ref, ()=>({ focus: ()=> inputRef.current?.focus() }));
  return <input ref={inputRef}/>;
});
```
**Follow‑ups:** Why keep imperative APIs minimal?

---

## Rendering & Performance

### 21) Re-render triggers
**One‑liner:** Props/state changes, context updates, and parent re-renders.
**Follow‑ups:** How to profile re-renders?

---

### 22) React.memo — when and how
**One‑liner:** Memoize function components to skip render if props are shallow‑equal.
```jsx
const Row = React.memo(function Row({item}){return <li>{item.name}</li>});
```
**Follow‑ups:** Why over‑memoization can hurt?

---

### 23) `useMemo` pitfalls
**One‑liner:** If recompute is cheap or deps change often, memo won’t help.
**Follow‑ups:** How to prove it with Profiler?

---

### 24) Keyed lists vs index keys
**One‑liner:** Index keys break identity on reorder/delete; prefer stable IDs.
**Follow‑ups:** When lists are truly static?

---

### 25) Avoiding prop‑drilling
**Options:** Context, composition, co‑locating state, event bubbling, or global store.
**Follow‑ups:** When does Context become overused?

---

### 26) Suspense — what does it do?
**One‑liner:** Lets components wait for async data by showing fallback UI.
**Follow‑ups:** Relationship with concurrent rendering?

---

### 27) Concurrent rendering (concept)
**Analogy:** Like having draft renders that React may discard if newer updates arrive (“time slicing”).
**Follow‑ups:** Does it guarantee faster apps?

---

### 28) Error boundaries
**One‑liner:** Catch render errors in subtree and render fallback (class only for now).
```jsx
class Boundary extends React.Component{
  state={err:null};
  static getDerivedStateFromError(e){return {err:e};}
  componentDidCatch(e,info){/* log */}
  render(){return this.state.err? <h1>Oops</h1> : this.props.children;}
}
```
**Follow‑ups:** What errors are **not** caught? (event handlers, async, etc.)

---

### 29) Portals
**One‑liner:** Render children into a different DOM subtree.
```jsx
return ReactDOM.createPortal(<Modal/>, document.getElementById('modal-root'));
```
**Follow‑ups:** Accessibility considerations?

---

### 30) StrictMode
**One‑liner:** Dev‑only checks: highlight unsafe lifecycles, double‑invoke certain functions to surface issues.
**Follow‑ups:** Why are some effects run twice in dev?

---

## Routing

### 31) Client‑side routing basics
**One‑liner:** Intercepts navigation and updates UI without full page reloads.
**Follow‑ups:** SEO tradeoffs and mitigations?

---

### 32) Route params & search params
```jsx
import {useParams, useSearchParams} from 'react-router-dom';
```
**Follow‑ups:** How to handle optional params?

---

### 33) Code‑splitting routes
```jsx
const Page = React.lazy(()=>import('./Page'));
<Suspense fallback={<Spinner/>}><Page/></Suspense>
```
**Follow‑ups:** Error boundary needs?

---

## Forms & Validation

### 34) Debounced inputs
```jsx
const [value,setValue]=useState("");
useEffect(()=>{ const id=setTimeout(()=>onChange(value),300); return ()=>clearTimeout(id) },[value]);
```
**Follow‑ups:** Why debounce at edges?

---

### 35) Derived state — avoid duplication
**One‑liner:** Derive view from source state instead of storing duplicated state.
**Follow‑ups:** Bad example of duplicated state?

---

### 36) Form libs vs hand‑rolled
**Difference:**
- **Libraries:** Schema validation, nested fields, perf tricks.
- **Hand‑rolled:** Total control, smaller bundle.
**Follow‑ups:** When to switch?

---

## State Management

### 37) Local vs global vs server state
**Difference:** UI‑local (component), app‑wide (context/store), and remote cache (server state libs).
**Follow‑ups:** Why treat server state differently?

---

### 38) Context — when and how
```jsx
const ThemeContext = React.createContext('light');
function App(){ return <ThemeContext.Provider value="dark"><Page/></ThemeContext.Provider>}
```
**Follow‑ups:** Perf costs of context changes?

---

### 39) Redux vs Context
**Difference:** Redux = predictable centralized state + tooling; Context = dependency injection mechanism.
**Follow‑ups:** When Redux Toolkit over classic Redux?

---

### 40) Server state tools (e.g., React Query)
**One‑liner:** Treat remote data as a cache: fetching, caching, invalidation, background sync.
**Follow‑ups:** Cache invalidation strategies?

---

## Data Fetching Patterns

### 41) Fetch in effects (classic)
```jsx
useEffect(()=>{ let alive = true;
  fetch(url).then(r=>r.json()).then(data=>{ if(alive) setData(data); });
  return ()=>{alive=false};
}, [url]);
```
**Follow‑ups:** AbortController vs flag pattern?

---

### 42) Suspense for data fetching (concept)
**One‑liner:** Components let React wait; hooks throw promises to signal pending data.
**Follow‑ups:** What is a resource wrapper pattern?

---

### 43) Error handling UI
**One‑liner:** Show fallback, retry, toast; separate transport errors from domain errors.
**Follow‑ups:** Retrying strategies?

---

## Testing

### 44) RTL vs Enzyme
**Difference:** RTL tests behavior from user’s perspective; Enzyme (legacy) focused on internals.
**Follow‑ups:** Why prefer RTL with JSDOM?

---

### 45) Unit test a hook
```jsx
// with @testing-library/react
function Counter(){const [c,setC]=useState(0); return <button onClick={()=>setC(c+1)}>{c}</button>}
```
**Follow‑ups:** What to assert for effects?

---

### 46) Snapshot tests — pros/cons
**Pros:** Quick regression checks. **Cons:** Brittle, noisy diffs.
**Follow‑ups:** When are they valuable?

---

## Build, Tooling, Ecosystem

### 47) CRA, Vite, Next.js — differences
**Difference:**
- **CRA:** Legacy scaffolding; heavier.
- **Vite:** Fast dev server, modern build.
- **Next.js:** Framework with routing, SSR/SSG, edge.
**Follow‑ups:** When pick each?

---

### 48) Tree‑shaking & dead‑code elimination
**One‑liner:** Use ES modules and avoid side‑effects to enable eliminations.
**Follow‑ups:** Why mark `sideEffects: false`?

---

### 49) Bundle splitting and dynamic import
```jsx
const Widget = React.lazy(()=>import('./Widget'));
```
**Follow‑ups:** Granularity trade‑offs?

---

### 50) Source maps and debugging
**One‑liner:** Map transpiled code back to source for better debugging.
**Follow‑ups:** Security concerns in prod?

---

## Accessibility & UX

### 51) ARIA basics in React
**One‑liner:** Use semantic HTML first; add ARIA when needed; tie labels via `htmlFor`/`id`.
**Follow‑ups:** Managing focus after modal open?

---

### 52) Keyboard navigation
**One‑liner:** Tab order, roving tabindex, `aria-activedescendant`, focus traps.
**Follow‑ups:** How to test with RTL?

---

### 53) Announcing async updates
```jsx
const liveRef = useRef();
useEffect(()=>{ liveRef.current.textContent = `Loaded ${count} items`; },[count]);
<span role="status" aria-live="polite" ref={liveRef} />
```
**Follow‑ups:** `aria-busy` usage?

---

## Advanced Patterns

### 54) Render props
```jsx
<DataProvider render={(data)=> <List data={data}/> }/>
```
**Follow‑ups:** Compare to custom hooks?

---

### 55) Higher‑Order Components (HOCs)
**One‑liner:** Functions that take a component and return an enhanced one.
**Follow‑ups:** Pitfalls (wrapping hell, refs, displayName).

---

### 56) Controlled compound components
**One‑liner:** Parent orchestrates state for a set of subcomponents (e.g., Tabs).
**Follow‑ups:** Context + state machine approach?

---

### 57) State machines with React
**One‑liner:** Explicit states and transitions reduce edge‑case bugs.
**Follow‑ups:** Where do machines shine (wizards, async, forms)?

---

### 58) Headless UI components
**One‑liner:** Logic without styling; consumers bring their own UI.
**Follow‑ups:** Pros/cons for design systems.

---

### 59) React performance checklist (quick)
**Points:** keys, memoization, split bundles, avoid unnecessary context churn, measure first.
**Follow‑ups:** How to detect wasted renders?

---

### 60) Lazy images & IntersectionObserver
```jsx
const ref=useRef();
useEffect(()=>{ const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting) load(); }); io.observe(ref.current); return ()=>io.disconnect(); },[]);
```
**Follow‑ups:** Polyfills/server rendering caveats?

---

## Next.js / SSR / SSG (framework concepts that often appear)

### 61) SSR vs SSG vs CSR
**Difference:**
- **SSR:** Render on server per request.
- **SSG:** Pre‑render at build time.
- **CSR:** Render in browser.
**Follow‑ups:** SEO and TTFB trade‑offs?

---

### 62) Next.js data fetching styles (concept)
**One‑liner:** Route handlers, server actions, fetch with caching, edge runtime.
**Follow‑ups:** Revalidation strategies?

---

### 63) Image optimization
**One‑liner:** Responsive sizes, lazy loading, modern formats.
**Follow‑ups:** When not to optimize?

---

## Type Safety

### 64) Typing props with TS
```tsx
type Props={title:string; onClick?:()=>void};
function Button({title,onClick}:Props){ return <button onClick={onClick}>{title}</button> }
```
**Follow‑ups:** Pros/cons of `React.FC`?

---

### 65) Typing events
```tsx
function Input(){ const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{}; }
```
**Follow‑ups:** Synthetic vs native events?

---

### 66) Generic components
```tsx
function List<T>({items, render}:{items:T[]; render:(t:T)=>React.ReactNode}){
  return <ul>{items.map(render)}</ul>;
}
```
**Follow‑ups:** Inference tricks?

---

## Edge Cases & Gotchas

### 67) Stale closures in effects
**One‑liner:** Effect uses values from render it was defined in; include deps or use refs.
**Follow‑ups:** Why exhaustive‑deps rule exists?

---

### 68) Derived state from props (anti‑pattern)
**One‑liner:** Prefer memoized derived values; if you must mirror, keep one source of truth.
**Follow‑ups:** `getDerivedStateFromProps` pitfalls?

---

### 69) setState batching
**One‑liner:** Multiple updates may be batched; use updater form to avoid races.
**Follow‑ups:** Microtasks vs macrotasks relevance?

---

### 70) Keys and component state loss
**One‑liner:** Changing key remounts component (state resets).
**Follow‑ups:** Useful for resetting forms?

---

## Styling

### 71) CSS Modules vs CSS‑in‑JS vs Tailwind
**Difference:**
- **Modules:** Scoped classnames, build‑time.
- **CSS‑in‑JS:** Runtime/theming/dynamic styles.
- **Utility CSS:** Tokenized classes, fast iteration.
**Follow‑ups:** Bundle and runtime impacts?

---

### 72) Inline styles caveats
**One‑liner:** No pseudo‑classes/media queries; objects re‑create on each render unless memoized.
**Follow‑ups:** Style object memoization?

---

### 73) Theming approaches
**One‑liner:** Context tokens, CSS variables, or CSS‑in‑JS theme objects.
**Follow‑ups:** Dark mode strategies?

---

## Component Design & APIs

### 74) Prop naming and ergonomics
**One‑liner:** Prefer single source of truth, avoid conflicting props, provide sensible defaults.
**Follow‑ups:** When to expose render props vs children?

---

### 75) Controlled vs uncontrolled APIs (component API design)
**One‑liner:** Offer both when possible; document precedence rules.
**Follow‑ups:** How to design priority between props and internal state?

---

### 76) Accessibility of custom widgets
**One‑liner:** Manage focus, roles, keyboard interactions; announce changes.
**Follow‑ups:** Reference WAI‑ARIA Authoring Practices?

---

## Real‑World Scenarios

### 77) Infinite scrolling list
**One‑liner:** Virtualize rows, observer for sentinel, cache pages.
**Follow‑ups:** Windowing libs (react‑window, react‑virtual)?

---

### 78) File uploads
**One‑liner:** Controlled inputs + progress + cancel via AbortController.
**Follow‑ups:** Chunked uploads and retries?

---

### 79) Web sockets with React
**One‑liner:** Manage socket outside render, expose via context or custom hook.
**Follow‑ups:** Cleanup and reconnection?

---

### 80) Optimistic UI
**One‑liner:** Pretend success, rollback on failure, keep mutation IDs.
**Follow‑ups:** Idempotent server APIs?

---

## Architecture & Patterns

### 81) Feature folders vs monolith components
**One‑liner:** Group by feature/domain; keep components small and cohesive.
**Follow‑ups:** Module boundaries and ownership?

---

### 82) Error handling strategy
**One‑liner:** Boundary + toast + retry; centralize logging.
**Follow‑ups:** User‑recoverable vs developer errors?

---

### 83) Internationalization (i18n)
**One‑liner:** Message catalogs, ICU formats, RTL support, locale‑aware formatting.
**Follow‑ups:** Lazy‑loading locale bundles?

---

### 84) Forms with async validation
**One‑liner:** Validate on blur/submit; debounce server checks.
**Follow‑ups:** Race conditions and last‑write‑wins?

---

### 85) Data normalization
**One‑liner:** Store entities by id; derive denormalized views.
**Follow‑ups:** Normalization helpers (normalizr)?

---

### 86) Deeply nested updates
**One‑liner:** Immer or reducers; avoid prop drilling via context.
**Follow‑ups:** Structural sharing for performance?

---

### 87) Feature flags
**One‑liner:** Gate UI by flags; evaluate server/client with hydration awareness.
**Follow‑ups:** Kill‑switch strategies?

---

### 88) Logging and analytics
**One‑liner:** Log meaningful events, respect privacy, throttle.
**Follow‑ups:** Where to place trackers in React tree?

---

## Miscellaneous

### 89) Fragments vs div wrappers
**One‑liner:** Avoid extra nodes; use `<>...</>` or `React.Fragment`.
**Follow‑ups:** Keyed fragments?

---

### 90) PropTypes vs TypeScript
**Difference:** PropTypes = runtime checks; TS = compile‑time checks.
**Follow‑ups:** Can both coexist?

---

### 91) PureComponent vs memo
**Difference:** Class optimization vs function counterpart with shallow compare.
**Follow‑ups:** Custom comparison function in `memo`?

---

### 92) Event pooling (historical)
**One‑liner:** Synthetic events used to be pooled; now generally not — but don’t async‑hold references blindly.
**Follow‑ups:** Access `e.persist()` history?

---

### 93) Refs vs state for triggering re-render
**One‑liner:** Changing refs doesn’t re-render; use state for UI changes.
**Follow‑ups:** When to keep counters in refs?

---

### 94) Hydration (SSR)
**One‑liner:** Attach event listeners to server‑rendered markup; mismatches cause warnings.
**Follow‑ups:** Avoiding hydration mismatches?

---

### 95) Windowing / virtualization
**One‑liner:** Render visible slice to keep DOM light.
**Follow‑ups:** Overscan tuning?

---

### 96) Data persistence (localStorage)
```jsx
useEffect(()=>{ localStorage.setItem('count', String(count)); },[count]);
```
**Follow‑ups:** Serialization and quota errors?

---

### 97) Dependency arrays — how to think
**Analogy:** Think of an effect as subscribing to the values in the deps list.
**Follow‑ups:** Why linters enforce exhaustive deps?

---

### 98) Race conditions in async effects
**One‑liner:** Track request ids/AbortController; set state only for latest.
**Follow‑ups:** Show an example with out‑of‑order responses.

---

### 99) Reusable list renderers
```jsx
function List({items, render}){ return <ul>{items.map(render)}</ul> }
```
**Follow‑ups:** Key placement and stability?

---

### 100) The “one source of truth” rule
**One‑liner:** Keep canonical data in one place; derive everything else.
**Follow‑ups:** Show a bug caused by duplicating state.

---

## Bonus: Quick Practice Prompts (Not counted)

- Refactor a class component with lifecycles into hooks.
- Build a debounced search box with async fetch and empty‑state UX.
- Create a tab system with keyboard navigation and ARIA roles.
- Add Suspense boundaries and error boundary around a lazy route.
- Implement optimistic mutation with rollback using a server‑state library.

---

### Final Tip
Measure first, optimize second. Use React DevTools Profiler to validate every “optimization” claim.
