---
title: Advanced JavaScript
---

# Advanced JavaScript (Interview Prep)

This page covers senior-level topics and the "write the code on the whiteboard" questions: functional programming, design patterns, generators, proxies, memory, performance, and the polyfills interviewers love (debounce, throttle, `bind`, `Promise.all`). Plain language, relatable analogies, and **Deeper note** boxes for precise detail.

---

## 1. Functional Programming

Functional programming means building software from small, predictable functions and avoiding shared, changing state.

**Analogy:** A **pure function** is like a vending machine — press B4, you always get the same snack, and nothing else in the room changes. An **impure function** is like a chef who, while cooking, also rearranges your fridge and turns off your lights (side effects) — you can never be sure what state you'll find afterward.

**Pure function** — same input → same output, changes nothing outside itself:

```javascript
const add = (a, b) => a + b;          // ✅ pure
let total = 0;
const addImpure = (n) => total += n;  // ❌ impure (changes outside state)
```

**Immutability** — never modify data; create new copies instead:

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // ✅ original untouched (arr.push(4) would mutate)
```

**Function composition** — combine small functions into bigger ones:

```javascript
const compose = (f, g) => (x) => f(g(x));
const double = (x) => x * 2;
const increment = (x) => x + 1;
const doubleThenInc = compose(increment, double);
doubleThenInc(5); // 11  (double=10, then +1)
```

> **Deeper note:** Composition runs **right to left** (`compose`); a left-to-right version is `pipe`. Pure functions enable **memoization**, easy testing, and referential transparency (you can swap a call for its result). True immutability for nested data needs `structuredClone` or libraries like Immer, since spread is shallow. `Object.freeze` enforces shallow immutability at runtime.

> **Q: What is a pure function and why does it matter?** No side effects, same output for the same input. Easy to test, cache, and reason about; prevents shared-state bugs.

---

## 2. Currying

Currying turns a function that takes many arguments into a chain of functions that each take one. Useful for reusing and pre-filling arguments.

**Analogy:** Currying is like a multi-stage form. Instead of one giant form demanding name, address, and payment all at once, you fill one field, hit next, fill the second, hit next... Each step remembers what you've entered (closure) and only the final step produces the result.

```javascript
const curryAdd = (a) => (b) => (c) => a + b + c;
curryAdd(1)(2)(3); // 6

const add5 = curryAdd(5); // pre-fill the first argument
add5(10)(20);             // 35
```

A **generic curry** function (common interview ask):

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...next) => curried(...args, ...next);
  };
}

const sum = (a, b, c) => a + b + c;
const csum = curry(sum);
csum(1)(2)(3); // 6
csum(1, 2)(3); // 6
csum(1)(2, 3); // 6
```

> **Deeper note:** The generic version relies on `fn.length` (the count of declared parameters) to know when enough args have arrived — which is why it breaks with default or rest parameters (they don't count toward `length`). Currying always produces unary steps; the looser **partial application** just pre-fills *some* arguments (what `bind` does). Both are powered by closures.

---

## 3. Memoization

Memoization caches a function's results so repeated calls with the same input are instant. Great for expensive calculations.

**Analogy:** Memoization is a receptionist with a notepad. The first time someone asks "what's the total for order #42?", she does the full calculation and writes the answer on her pad. Next time anyone asks the same question, she just reads it off the pad — no recalculation.

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key); // cached
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fastSquare = memoize((n) => n * n);
fastSquare(4); // computes → 16
fastSquare(4); // from cache → 16 (instant)
```

This is a textbook closure use case: `cache` is private and persists between calls.

> **Deeper note:** `JSON.stringify` as a key is simple but breaks on functions, `undefined`, key order, and circular refs — for single-arg numeric/string keys, use the arg directly. Unbounded caches **leak memory**; production memoizers add an LRU eviction or a `WeakMap` (object keys, GC-friendly). Only memoize **pure** functions — caching an impure one returns stale results.

---

## 4. Debounce and Throttle (Must-Know Implementations)

**Analogy:** **Debounce** is an elevator door — each new arrival resets the close timer; it shuts only once people *stop* coming. **Throttle** is a subway turnstile — it lets at most one person through per fixed interval, however large the crowd.

**Debounce** — run only after the user *stops* triggering for X ms. Perfect for search inputs and resize:

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);                          // cancel previous wait
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const onSearch = debounce((q) => console.log("Searching:", q), 500);
```

**Throttle** — run at most once per X ms. Perfect for scroll handlers:

```javascript
function throttle(fn, limit) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}

const onScroll = throttle(() => console.log("scroll"), 200);
```

> **Deeper note:** Production versions add options: a `leading`/`trailing` edge (fire on the first call, the last, or both) and a `cancel()` method. The throttle above is leading-edge; a trailing-edge version captures the latest args and fires at the window's end. Both rely on closures to hold the timer/flag. Preserve `this` with `.apply(this, args)` so they work as methods.

> **Q: Difference between debounce and throttle?** Debounce waits for a pause then runs once ("did the user finish?"). Throttle runs at a steady max rate during continuous activity ("limit how often this fires").

---

## 5. Writing Polyfills

A polyfill is your own implementation of a built-in feature. Interviewers ask these to test that you understand `this`, callbacks, and prototypes.

**Analogy:** A polyfill is like knowing how to start a car with a manual crank when the electric starter isn't available. You prove you understand the engine underneath, not just the convenient button.

**Polyfill `Array.map`:**

```javascript
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
[1, 2, 3].myMap(x => x * 2); // [2, 4, 6]
```

**Polyfill `bind`:**

```javascript
Function.prototype.myBind = function (context, ...presetArgs) {
  const fn = this; // the function being bound
  return function (...laterArgs) {
    return fn.apply(context, [...presetArgs, ...laterArgs]);
  };
};
```

**Polyfill `Promise.all`:**

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value;       // keep original order
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);             // reject on first failure
    });
  });
}
```

> **Deeper note:** Real `map` skips holes in sparse arrays and accepts a `thisArg`; real `bind` also makes the returned function work with `new`. In `promiseAll`, wrapping with `Promise.resolve(p)` handles non-promise values, and writing `results[i]` (not `push`) preserves order despite different finish times — handle the empty-array case by resolving immediately. These reveal whether you understand `this`, the prototype chain, and the event loop.

---

## 6. Generators and Iterators

A **generator** is a function that can pause and resume. Define it with `function*` and pause with `yield`. It produces values one at a time, on demand.

**Analogy:** A generator is like a Pez dispenser. It doesn't dump all the candy at once — each time you ask (`.next()`), it pops out exactly one piece and then waits, holding its place, until you ask again. The sequence can even be infinite because it only computes the next piece when requested (lazy).

```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++; // pause here, return the value, resume next time
  }
}

const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
```

**Iterators** — any object with a `next()` method returning `{ value, done }`. Generators create iterators automatically.

> **Deeper note:** `.next(arg)` can pass a value *back in*, so `yield` is two-way communication — the basis of older coroutine-style async (`co`, redux-saga). A generator implements the **iterable protocol** (`Symbol.iterator`), so it works with `for...of`, spread, and destructuring. `yield*` delegates to another iterable. Generators power lazy/infinite sequences without holding everything in memory.

> **Q: What is a generator function?** A `function*` that can pause with `yield` and resume later, producing values lazily — computing the next only when asked.

---

## 7. Proxy and Reflect (Metaprogramming)

A **Proxy** wraps an object and lets you intercept operations like reading, writing, or deleting properties. This is "metaprogramming" — code that controls how other code behaves.

**Analogy:** A Proxy is a personal assistant sitting between you and a busy executive (the real object). Every request to read or change something goes through the assistant first, who can screen it, log it, validate it, or supply a default reply ("no such property") before (or instead of) reaching the executive.

```javascript
const user = { name: "Alice" };

const proxy = new Proxy(user, {
  get(target, prop) {
    return prop in target ? target[prop] : `No property "${prop}"`;
  },
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("age must be a number");
    }
    target[prop] = value;
    return true;
  }
});

proxy.name;     // "Alice"
proxy.email;    // 'No property "email"'
proxy.age = 30; // works
// proxy.age = "x"; // throws TypeError
```

Proxies power reactive frameworks (Vue 3's reactivity is built on Proxy) and validation layers.

> **Deeper note:** Traps include `get`, `set`, `has`, `deleteProperty`, `apply`, and `construct`. **Reflect** provides the default behavior for each trap (`Reflect.get(target, prop, receiver)`), and using it inside traps correctly forwards `this`/`receiver` for inherited accessors. `set` must `return true` (or throw) — returning falsy throws in strict mode. Proxies can't be made fully transparent (identity, private `#` fields, and some internals leak), so they're powerful but not free.

---

## 8. Modules: import / export

Modules split code into reusable files. Modern JavaScript uses **ES Modules (ESM)**.

**Analogy:** Modules are like recipes in a cookbook. Each recipe (file) lists what it shares (`export`) — and a chef (another file) can `import` just the recipes they need, rather than copying the entire cookbook into every kitchen.

```javascript
// math.js
export const add = (a, b) => a + b;          // named export
export default function multiply(a, b) {      // default export
  return a * b;
}

// app.js
import multiply, { add } from "./math.js";
add(2, 3);      // 5
multiply(2, 3); // 6
```

| | ES Modules (ESM) | CommonJS (CJS) |
|---|---|---|
| Syntax | `import` / `export` | `require` / `module.exports` |
| Loading | Static, async | Dynamic, synchronous |
| Used in | Browsers, modern Node | Older Node.js |
| Top-level `await` | Yes | No |

> **Deeper note:** ESM imports are **live, read-only bindings** (not copies) and are **hoisted** — imports resolve before the module body runs, so import order doesn't affect availability. ESM is statically analyzable, which enables **tree shaking**. Dynamic `import()` returns a promise for code-splitting/lazy loading. Modules run in strict mode with their own scope (no accidental globals) and execute once, caching the result.

> **Q: Difference between named and default exports?** Many named exports per module (imported by exact name in braces); only one default (imported with any name, no braces).

---

## 9. Memory Management & Garbage Collection

JavaScript frees memory automatically via **garbage collection**. The main algorithm is **mark-and-sweep**: starting from "roots" (like the global object), it marks everything reachable; whatever isn't reachable is deleted.

**Analogy:** Garbage collection is like a librarian reclaiming books no one can reach anymore. Starting from the front desk (roots), she follows every reference — books on desks, books cited by those books — and marks them "in use." Any book no chain of references leads to is considered abandoned and removed from the shelves.

**Common memory leaks to mention in interviews:**

1. **Forgotten timers/listeners** — `setInterval` or listeners never cleared keep references alive. Always `clearInterval` and `removeEventListener`.
2. **Accidental globals** — assigning to an undeclared variable creates a global that's never cleaned up.
3. **Closures holding large data** — a closure referencing a big object prevents its collection.
4. **Detached DOM nodes** — keeping a JS reference to a removed DOM element.

Use `WeakMap` / `WeakSet` for keys that shouldn't prevent garbage collection.

> **Deeper note:** "Reachability," not "no references," is the rule — which is why two objects referencing only each other (a cycle) are still collected if nothing reachable points to them (mark-and-sweep handles cycles; old reference-counting didn't). Modern V8 uses a **generational** collector (short-lived objects in a "young" space collected often). `WeakRef`/`FinalizationRegistry` exist for advanced cases but are discouraged for normal code.

> **Q: How does garbage collection work?** Mark-and-sweep: mark all objects reachable from the roots, then sweep (free) the unreachable ones. No manual freeing.

---

## 10. Deep Clone (Common Coding Question)

A shallow copy (`{...obj}`) only copies the top level; nested objects are still shared. A **deep clone** copies everything.

**Analogy:** A shallow copy is like photocopying a folder's cover page but stapling the *same* internal documents to both folders — edit a document and both folders show the change. A deep clone re-photocopies every page inside, all the way down, so the two folders are truly independent.

```javascript
// Modern, built-in (best answer)
const copy = structuredClone(original);

// Manual recursive version (what interviewers want you to write)
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj; // primitive
  if (Array.isArray(obj)) return obj.map(deepClone);
  const cloned = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}
```

The quick trick `JSON.parse(JSON.stringify(obj))` works but loses functions, `undefined`, `Date` objects, and breaks on circular references.

> **Deeper note:** The naive recursive `deepClone` infinite-loops on **circular references** — a robust version passes a `WeakMap` to track already-cloned objects. It also doesn't preserve `Date`, `Map`, `Set`, or `RegExp` — which is exactly why `structuredClone` (which handles all of these and cycles) is the modern best answer. `structuredClone` still can't clone functions or DOM nodes.

---

## 11. Execution Context & the `new` Keyword

Every time a function runs, JavaScript creates an **execution context** holding its variables, scope chain, and `this`. These stack up in the **call stack**.

**Analogy:** Each function call is like a sticky note placed on top of a stack. The note holds that call's local info. When the function finishes, you peel off the top note and resume the one below. The `new` keyword is a factory line that stamps out a fresh product (object), attaches its instruction manual (prototype), and hands it back.

**What `new` does, step by step** (a popular question):

```javascript
function Person(name) { this.name = name; }
const p = new Person("Al");

// `new` does four things:
// 1. Creates a new empty object {}
// 2. Links it to Person.prototype
// 3. Binds `this` to that new object
// 4. Returns the object (unless the function returns its own object)
```

> **Deeper note:** Creating a context has two phases — **creation** (hoisting: declarations registered, `let`/`const` enter the TDZ, `this` and the scope chain set) then **execution** (assignments run line by line). Exceeding the stack depth (e.g., unbounded recursion) throws `RangeError: Maximum call stack size exceeded`. On the step-4 caveat: if a constructor explicitly returns an **object**, that object wins; returning a primitive is ignored and the new `this` is returned.

---

## 12. Performance Optimization (Talking Points)

When asked "how would you make a web app faster?":

- **Debounce/throttle** expensive event handlers (scroll, resize, input).
- **Lazy load** images and code (`import()` dynamic imports, code splitting).
- **Minimize DOM access** — batch reads/writes, use `DocumentFragment`.
- **Avoid layout thrashing** — don't interleave reads and writes of layout properties in a loop.
- **Memoize** expensive pure computations.
- **Use efficient data structures** — `Map`/`Set` for lookups instead of `Array.includes()` in loops (O(1) vs O(n)).
- **Reduce bundle size** — tree shaking removes unused code; lazy-load routes.

**Analogy:** Layout thrashing is like repeatedly opening the fridge to check one ingredient, closing it, walking to the pantry, then coming back to the fridge for the next — instead of reading your whole shopping list once. Batch your reads, then do all your writes.

> **Deeper note:** Reading a layout property (`offsetHeight`, `getBoundingClientRect`) forces a **synchronous reflow** if a write is pending — interleaving read/write/read/write in a loop is the thrash. Group all reads, then all writes (or use `requestAnimationFrame`). Other big wins: virtualize long lists, use CSS transforms/opacity for animation (compositor-only, no reflow), and prefer `IntersectionObserver` over scroll math.

---

## 13. Design Patterns (Frequently Asked)

Interviewers like to hear you name patterns you actually use.

**Module pattern** — encapsulate private state with a closure (the pre-class classic):

```javascript
const counter = (function () {
  let count = 0;                          // private
  return {
    increment() { return ++count; },
    get() { return count; }
  };
})();
counter.increment(); // 1
```

**Singleton** — one shared instance everywhere (e.g., a config or store). **Observer / Pub-Sub** — objects subscribe to events and get notified on change (the heart of event systems and reactive state). **Factory** — a function that creates and returns objects so callers don't use `new` directly.

**Analogy:** The Observer pattern is a newsletter. Subscribers sign up once (`subscribe`); when news breaks, the publisher emails everyone on the list (`notify`). Subscribers don't keep refreshing the website — they get pushed updates.

```javascript
class EventBus {
  #subscribers = {};
  subscribe(event, fn) {
    (this.#subscribers[event] ??= []).push(fn);
  }
  publish(event, data) {
    (this.#subscribers[event] || []).forEach(fn => fn(data));
  }
}
```

> **Deeper note:** The module pattern is just a closure + IIFE; ES modules now give the same encapsulation natively. Observer (subject pushes to observers) differs subtly from Pub/Sub (a broker decouples publishers and subscribers entirely). Singletons are convenient but act as global state, which complicates testing — inject dependencies where you can.

---

## 14. Hardest Q&A (Rapid Fire)

**Q: Difference between `Object.freeze()` and `const`?**
`const` stops reassigning the variable; contents can still change. `Object.freeze(obj)` makes properties read-only (shallow — nested objects aren't frozen).

**Q: Difference between shallow and deep copy?**
Shallow duplicates only the first level (nested objects shared); deep recursively duplicates everything (nothing shared).

**Q: Difference between microtasks and macrotasks?**
Microtasks (promise callbacks, `queueMicrotask`) run right after the current code and before any macrotask. Macrotasks (`setTimeout`, `setInterval`, I/O) run one per event-loop tick, after all microtasks drain.

**Q: What is a `WeakMap` and when would you use it?**
A map whose keys must be objects, held *weakly* — if nothing else references a key, it can be garbage collected. Good for private/metadata attached to objects without leaks.

**Q: Difference between the call stack and the task queue?**
The call stack runs synchronous code now; finished async callbacks wait in task queues, and the event loop moves them to the stack only when it's empty.

**Q: What are higher-order functions?**
Functions that take or return functions — enabling reusable patterns like `memoize`, `debounce`, and `curry`.

**Q: How does `this` behave in an arrow function?**
No own `this`; it inherits from the surrounding lexical scope at definition time — ideal for callbacks inside methods.

**Q: What is tree shaking?**
A build-step optimization (Webpack, Rollup) that removes unused exports from the final bundle, enabled by the static structure of ES modules.

**Q: What is the temporal dead zone (TDZ)?**
The gap between entering a scope and the `let`/`const` declaration line, where the variable exists but can't be accessed — touching it throws `ReferenceError`.

**Q: Difference between `Promise.all` and `Promise.allSettled`?**
`Promise.all` rejects as soon as any fails. `Promise.allSettled` never rejects — it waits for all and reports each one's status.

**Q: What is debouncing vs throttling?**
Debounce waits for a pause then fires once; throttle fires at most once per interval during continuous activity.

---

## 15. How to Use This Guide for Interviews

1. **Read in order** — Basics → Intermediate → Advanced.
2. **Type out every example yourself** — don't just read. Run them in the browser console or Node.
3. **Practice the polyfills from memory** — `debounce`, `throttle`, `bind`, `Promise.all`, `deepClone`. These are extremely common live-coding tasks.
4. **Say your reasoning out loud** — interviewers reward clear explanation as much as correct code.
5. **Review the Q&A and Deeper notes the night before** — they're written the way you should answer aloud.
6. **Build something small** — a real project you can talk about beats any amount of memorized trivia.

Good luck — if you understand every topic across these three pages, you're ready for basic, intermediate, and most senior JavaScript interviews.

Next: [DSA Practice in JavaScript](./dsa-practice.md) — classic coding problems solved with the concepts from all three pages, grouped by difficulty.
