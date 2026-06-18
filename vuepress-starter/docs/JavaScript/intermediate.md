---
title: Intermediate JavaScript
---

# Intermediate JavaScript (Interview Prep)

This page covers the topics interviewers ask **the most**. Each topic is explained in plain language, with a relatable analogy, a short example, and the real interview questions you'll be asked. The **Deeper note** boxes give the precise, advanced detail for experienced readers. Master everything here and you can clear the majority of mid-level JavaScript rounds.

---

## 1. Scope and Lexical Scope

**Scope** is "where a variable is visible." JavaScript has three: **global** (everywhere), **function** (inside a function), and **block** (inside `{ }`, for `let`/`const`).

**Lexical scope** means an inner function can see its outer function's variables, because scope is decided by *where code is written*, not where it's called.

**Analogy:** Scope is like nested rooms in a building. From an inner room you can see out through the open doors into the hallway and lobby (outer scopes), but people in the lobby can't see into your private inner room. "Lexical" means the walls are drawn on the blueprint (where you *write* the code), not rearranged at runtime.

```javascript
let globalVar = "I am global";

function outer() {
  let outerVar = "I am outer";
  function inner() {
    console.log(globalVar, outerVar); // inner sees both (lexical scope)
  }
  inner();
}
outer(); // "I am global" "I am outer"
```

The chain inner → outer → global is the **scope chain**. JavaScript searches outward until it finds the variable.

> **Deeper note:** Name lookup walks the scope chain *outward* and stops at the first match — this is **shadowing** when an inner variable hides an outer one of the same name. The chain is fixed at definition time (lexical/static scoping), which is exactly why closures work. If a variable isn't found anywhere, reading it throws `ReferenceError`; assigning to it (without declaration, non-strict mode) silently creates a global — a classic bug `"use strict"` prevents.

---

## 2. Closures

A **closure** is a function that *remembers* the variables of the place where it was created, even after that outer function has finished running. This is the single most-asked intermediate question.

**Analogy:** A closure is a backpack a function carries. When the function is born inside another function, it packs into its backpack every outer variable it references. You can hand that function to anyone, anywhere, and it still reaches into its backpack for those variables — even though the outer function ended long ago.

```javascript
function makeCounter() {
  let count = 0; // private variable, lives in the closure's "backpack"
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Even though `makeCounter()` has finished, the returned function still has access to `count`. The `count` variable is "closed over."

**Why closures matter:** data privacy (variables nobody outside can touch), function factories, and keeping state in callbacks.

**Classic interview trap — `var` in a loop:**

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}
```

`var` has one shared `i` for the whole loop, so by the time the timeouts run, `i` is 3. `let` creates a **new `i` for each iteration**, so each closure remembers its own value.

> **Deeper note:** Closures capture **variables by reference, not values** — which is why all three `var` callbacks print the final `i`. Each `let` iteration creates a fresh binding (the spec literally copies the loop variable per iteration). The classic pre-`let` fix was an **IIFE** capturing `i` as an argument. Closures keep their captured scope alive in memory, so a closure referencing a large object prevents garbage collection — a frequent source of leaks.

> **Q: What is a closure?** A function bundled with references to its surrounding (lexical) state. It can access outer variables even after the outer function returns.
> **Q: Give a real use case.** Private variables / data hiding (the counter), function factories, and remembering config inside event handlers and callbacks.

---

## 3. The `this` Keyword

`this` refers to the object that is *calling* the function. Its value is decided **at call time**, not where the function is written. Four rules, in priority order:

**Analogy:** `this` is like the word "here." Its meaning depends entirely on *who is speaking and where they're standing*, not on where the sentence was written down. The same function, called by different objects, has a different "here."

```javascript
// 1. Default — plain call: `this` is the global object (undefined in strict mode)
function show() { console.log(this); }
show();

// 2. Implicit — obj.method(): `this` is that object
const user = { name: "Alice", greet() { console.log(this.name); } };
user.greet(); // "Alice"  (this = user)

// 3. Explicit — call / apply / bind force `this`
function sayName() { console.log(this.name); }
sayName.call({ name: "Bob" }); // "Bob"

// 4. new — `this` is the brand-new object being created
function Person(name) { this.name = name; }
const p = new Person("Carol"); // this = the new object
```

**Arrow functions are special:** they have **no own `this`** — they use the `this` of wherever they were defined (lexical `this`). Perfect for callbacks inside methods:

```javascript
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // arrow keeps `this` = timer ✅
    }, 1000);
  }
};
```

> **Deeper note:** The four rules apply in priority order: `new` > explicit (`call`/`apply`/`bind`) > implicit (`obj.method()`) > default. The most common bug is "losing `this`" — passing `obj.method` as a callback strips the implicit binding, so `this` reverts to default. Fixes: arrow wrapper, `.bind(obj)`, or class field arrows. Note `bind` is permanent and `new` overrides it. In modules and strict mode, default `this` is `undefined`, not the global object.

---

## 4. call, apply, and bind

These three methods let you control what `this` is.

**Analogy:** Imagine a universal TV remote (a function) that can control *any* TV (any object). `call` and `apply` point the remote at a specific TV and press the button **now** — the only difference is how you hand over the settings (`call` = one by one, `apply` = a whole list). `bind` super-glues the remote to one TV and hands you back that paired remote to press **later**.

```javascript
function introduce(city, country) {
  console.log(`${this.name} from ${city}, ${country}`);
}
const person = { name: "John" };

introduce.call(person, "Paris", "France");    // call: args one by one
introduce.apply(person, ["Paris", "France"]); // apply: args as an array
const bound = introduce.bind(person, "Paris", "France");
bound(); // bind: returns a NEW function to call later
```

Memory hook: **C**all = **C**omma args, **A**pply = **A**rray of args, **B**ind = **B**ound copy for later.

> **Deeper note:** `bind` also enables **partial application** — pre-filling leading arguments (`const add5 = add.bind(null, 5)`). A `bind`-returned function can't be re-bound, but `new`-ing it ignores the bound `this` (though preset args remain). Writing a `bind` polyfill is a very common live-coding ask — see the Advanced page.

> **Q: Difference between call/apply/bind?** `call` and `apply` invoke immediately (difference is only comma-list vs array args). `bind` doesn't invoke; it returns a new function with `this` permanently fixed.

---

## 5. Higher-Order Functions & map / filter / reduce

A **higher-order function** takes a function as an argument or returns a function. `map`, `filter`, and `reduce` are the three array methods you must know cold.

**Analogy:** Picture a factory conveyor belt of items. `map` is a **station that transforms every item** (spray-paint each one) — same count out. `filter` is a **quality-control gate** that lets only passing items through — fewer items out. `reduce` is a **collector at the end** that combines everything into one package (a total, a single object).

```javascript
const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(n => n * 2);        // [2, 4, 6, 8, 10] — transform
const evens = nums.filter(n => n % 2 === 0); // [2, 4]           — keep matches
const sum = nums.reduce((total, n) => total + n, 0); // 15       — combine to one
```

Read `reduce` as: "start at `0`, then for each number add it to the running `total`." The second argument (`0`) is the starting value.

> **Deeper note:** `reduce` is the most general — you can build `map` and `filter` out of it. Always pass the **initial accumulator**; without it, the first element becomes the seed and an empty array throws. These methods are **pure and chainable** (`.filter(...).map(...)`) but each chain link creates a new array — for huge datasets a single `reduce` or a plain loop can be faster. Know also `find`, `some`, `every`, `flatMap`, and that `sort` mutates and compares as strings by default (`[1,10,2].sort()` → `[1,10,2]`).

> **Q: Difference between `map` and `forEach`?** `map` returns a new array (for transforming); `forEach` returns `undefined` (only side effects, like logging). Use `map` when you need the result.

---

## 6. Arrow Functions vs Regular Functions

```javascript
const add = (a, b) => a + b; // implicit return, no braces needed
```

**Analogy:** A regular function is a full-size company car that comes with its own driver (`this`), GPS (`arguments`), and the ability to found new branches (`new`). An arrow function is a lightweight scooter — no driver of its own (it borrows the surrounding `this`), no extras — fast and perfect for quick trips (callbacks).

Key differences interviewers want:

1. Arrow functions have **no own `this`** (they inherit it lexically).
2. Arrow functions have **no `arguments` object**.
3. Arrow functions **cannot be used as constructors** (`new` throws).
4. Shorter syntax; a single expression is returned automatically.

Use regular functions for object methods and constructors; use arrow functions for short callbacks.

> **Deeper note:** Arrows also have no `prototype` property and can't be generators (`function*`). Their lexical `this` makes them ideal inside `setInterval`/`map` within methods, but **wrong** as object methods (`this` would point outside the object) and wrong for prototype methods. To collect args in an arrow, use rest: `(...args) => args`.

---

## 7. ES6+ Features You Must Know

**Destructuring** — pull values out of arrays/objects into variables:

```javascript
const [first, second] = [10, 20];               // first=10, second=20
const { name, age } = { name: "Al", age: 30 };  // name="Al", age=30
```

**Spread (`...`)** — expand an array/object:

```javascript
const arr2 = [...[1, 2], 3, 4];            // [1, 2, 3, 4]
const merged = { ...{ a: 1 }, ...{ b: 2 } }; // { a:1, b:2 }
```

**Rest (`...`)** — collect remaining items into an array:

```javascript
function sum(...numbers) { return numbers.reduce((t, n) => t + n, 0); }
sum(1, 2, 3, 4); // 10
```

**Analogy:** Spread and rest are the same `...` symbol doing opposite jobs — like an accordion. **Spread unfolds** a packed list into separate items; **rest folds** separate items back into one packed list. Same hands, opposite motion.

**Default parameters:**

```javascript
function greet(name = "Guest") { return `Hi ${name}`; }
greet();      // "Hi Guest"
```

**Optional chaining (`?.`) and nullish coalescing (`??`):**

```javascript
const user = { profile: null };
console.log(user.profile?.email); // undefined (no crash)
console.log(user.name ?? "Anonymous"); // "Anonymous"
```

> **Deeper note:** Destructuring supports defaults, renaming (`{ a: x = 1 }`), nested patterns, and swapping (`[a, b] = [b, a]`). Spread copies are **shallow**. `?.` short-circuits the *whole* chain to `undefined` on the first nullish link and also works for calls (`obj.fn?.()`) and indexes (`arr?.[0]`). `??` falls back only on `null`/`undefined`, unlike `||` which falls back on any falsy value.

> **Q: Difference between `??` and `||`?** `||` falls back on any falsy value (`0`, `""`, `false` included). `??` only on `null`/`undefined`. So `0 || 5` is `5`, but `0 ?? 5` is `0`.

---

## 8. Classes and Prototypes

JavaScript uses **prototypes** for inheritance. Every object has a hidden link (`__proto__`) to another object it can borrow properties from. The `class` keyword (ES6) is friendlier syntax over this same prototype system.

**Analogy:** The prototype chain is like asking around an office for a stapler. You check your own desk first (the object itself). No stapler? You ask your manager (the prototype). Still none? Ask *their* manager (the next prototype up). You keep going up the chain until someone has it or you reach the top (`Object.prototype` → `null`) and give up.

```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(`${this.name} makes a sound`); }
}

class Dog extends Animal {        // inheritance
  speak() {
    super.speak();                // call the parent method
    console.log(`${this.name} barks`);
  }
}

const d = new Dog("Rex");
d.speak(); // "Rex makes a sound" then "Rex barks"
```

**Modern class features** interviewers like — private fields (`#`), getters, and static members:

```javascript
class BankAccount {
  #balance = 0;                 // private — unreadable outside the class
  static bankName = "JS Bank";  // static — belongs to the class, not instances

  deposit(amount) { this.#balance += amount; }
  get balance() { return this.#balance; } // read like a property: account.balance
}

const account = new BankAccount();
account.deposit(100);
console.log(account.balance);      // 100
console.log(BankAccount.bankName); // "JS Bank"
```

> **Deeper note:** Methods live on `Dog.prototype` (shared by all instances), not on each object — memory-efficient. `class` is **not** purely sugar: bodies run in strict mode, classes aren't hoisted (TDZ), and constructors must be called with `new`. `__proto__` (the instance's link) differs from `.prototype` (the property on constructor functions). `instanceof` walks the prototype chain. `#private` is enforced by the engine — accessing it outside is a *syntax* error, unlike the `_name` convention which is just a hint.

> **Q: What is prototypal inheritance?** Objects inherit directly from other objects via the prototype chain; a missing property is looked up the chain (read with `Object.getPrototypeOf`) until found or `null`.
> **Q: How is `#private` different from `_name`?** `_name` is just a naming hint and is still accessible; `#` is truly private — outside access is a syntax error.

---

## 9. Asynchronous JavaScript

JavaScript is **single-threaded** — one thing at a time. Async code lets slow tasks run in the background so the page doesn't freeze. Three generations:

**Analogy:** Ordering at a coffee shop. A **callback** is "tap me on the shoulder when it's ready" — fine once, but chaining many taps gets messy (callback hell). A **promise** is the buzzer they hand you — it will light green (fulfilled) or red (rejected). **async/await** is like the order magically appearing in your hands the moment it's done while your code reads as if you simply waited in line.

**1. Callbacks** — a function passed to run "later." Too much nesting causes "callback hell":

```javascript
getUser(1, (user) => {
  getOrders(user, (orders) => {
    getDetails(orders, (details) => {
      console.log(details); // deeply nested 😖
    });
  });
});
```

**2. Promises** — an object representing a future value. It is `pending`, then `fulfilled` or `rejected`.

```javascript
fetch("https://api.example.com/user")
  .then(res => res.json())               // on success
  .then(data => console.log(data))
  .catch(err => console.error(err))      // on failure
  .finally(() => console.log("done"));   // always
```

**3. async / await** — cleaner syntax over promises. Looks synchronous, easy to read:

```javascript
async function loadUser() {
  try {
    const res = await fetch("https://api.example.com/user");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Failed:", err);
  }
}
```

**Running promises in parallel** with `Promise.all`:

```javascript
const [users, posts] = await Promise.all([
  fetch("/users").then(r => r.json()),
  fetch("/posts").then(r => r.json())
]);
```

| Method | Behaviour |
|---|---|
| `Promise.all` | Resolves when **all** succeed; rejects if **any** fails |
| `Promise.allSettled` | Waits for all; never rejects (gives status of each) |
| `Promise.race` | Settles as soon as the **first** one settles |
| `Promise.any` | Resolves on the **first success**; rejects only if all fail |

> **Deeper note:** An `async` function *always* returns a promise; `return x` resolves with `x`, `throw` rejects. Sequential `await`s run one after another — to parallelize independent work, start the promises first (or use `Promise.all`) instead of awaiting each in turn. `await` only pauses its own function, not the whole program. A `.then` without a `.catch` (or an un-awaited rejecting promise) triggers an **unhandled rejection**.

> **Q: What is a Promise?** An object for the eventual result of an async operation, in one of three states: pending, fulfilled, rejected.
> **Q: Difference between async/await and promises?** `async/await` is sugar over promises — it reads top-to-bottom and uses `try/catch` instead of `.catch()`.

---

## 10. The Event Loop (Very Common Question)

This explains *how* JavaScript handles async with a single thread.

**Analogy:** Picture a chef (the call stack) with one cutting board — he can only do one task at a time. Slow jobs (a roast in the oven = `setTimeout`/`fetch`) are handed to assistants (Web APIs). When an assistant finishes, they don't barge in — they put a ticket in a **queue**. The **event loop** is the kitchen rule: "only pick up a new ticket when your cutting board is completely clear." VIP tickets (promises/**microtasks**) always get served before regular tickets (`setTimeout`/**macrotasks**).

- The **Call Stack** runs your code one function at a time.
- Slow tasks are handed to the **browser/Web APIs**.
- Finished callbacks wait in a **queue**.
- The **Event Loop** moves a queued callback onto the stack **only when the stack is empty**.

Microtasks (Promises) run before macrotasks (`setTimeout`):

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);            // macrotask
Promise.resolve().then(() => console.log("3"));   // microtask
console.log("4");
// Output: 1, 4, 3, 2
```

`1` and `4` are synchronous (first). The stack empties, so the loop drains the **microtask** queue (`3`) before the **macrotask** queue (`2`).

> **Deeper note:** The full microtask queue is drained **completely** after each macrotask and after the synchronous script — so a microtask that schedules another microtask can starve macrotasks. `queueMicrotask`, promise callbacks, and `MutationObserver` are microtasks; `setTimeout`, `setInterval`, I/O, and rendering are macrotasks. `setTimeout(fn, 0)` has a real minimum delay (~4ms when nested) and still waits for the stack and all microtasks.

> **Q: Why doesn't `setTimeout(fn, 0)` run immediately?** Its callback goes to the macrotask queue and only runs after all synchronous code and all microtasks finish.

---

## 11. DOM Events: Bubbling, Capturing & Delegation

When you click an element, the event travels in two phases: **capturing** (top → target) then **bubbling** (target → top). Handlers fire on bubbling by default.

**Analogy:** Bubbling is like a splash in a pond. You click the exact spot (the target), and ripples spread outward to its parents — the `<li>`, then the `<ul>`, then the `<body>`. **Event delegation** takes advantage of this: instead of putting a sensor on every single fish, you put one sensor at the pond's edge and identify which fish moved by reading the ripple (`e.target`).

```javascript
// One listener on the parent handles all current AND future <li> clicks
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});
```

`e.stopPropagation()` stops the event bubbling further; `e.preventDefault()` stops the browser's default action (form submit, link navigation).

> **Deeper note:** Listen in the capture phase by passing `{ capture: true }`. `e.target` is what was actually clicked; `e.currentTarget` is the element the listener is attached to — delegation relies on this distinction. Delegation saves memory (one listener vs hundreds) and automatically covers dynamically-added elements. For precise matching inside nested markup, use `e.target.closest(".item")` rather than checking `tagName`.

> **Q: What is event delegation and why use it?** Attaching one listener to a parent and using `e.target` to react to child clicks — saves memory and handles dynamically-added elements.

---

## 12. setTimeout, setInterval & Debounce/Throttle (intro)

```javascript
setTimeout(() => console.log("runs once after 1s"), 1000);
const id = setInterval(() => console.log("every 1s"), 1000);
clearInterval(id); // stop it
```

**Analogy:** **Debounce** is like an elevator door — every time someone new walks in, the "close" timer resets; the door only shuts once people *stop* arriving. Great for a search box that should fire only after typing pauses. **Throttle** is like a turnstile that admits at most one person every few seconds no matter how big the crowd — great for scroll handlers.

**Debounce** waits until activity *stops*; **throttle** runs at most once per time window. Full implementations are on the Advanced page.

> **Deeper note:** `setTimeout`/`setInterval` delays are **minimums**, not guarantees — a busy stack delays them, and background tabs throttle timers. `setInterval` can stack up callbacks if each run takes longer than the interval; a self-scheduling `setTimeout` avoids that. Always store the id and clear it (`clearInterval`/`clearTimeout`) to prevent leaks.

---

## 13. Error Handling

```javascript
try {
  JSON.parse("not valid json");
} catch (err) {
  console.error("Caught:", err.message);
} finally {
  console.log("always runs");
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

**Analogy:** `try/catch` is a tightrope with a safety net. You attempt the risky walk (`try`); if you slip, the net catches you so the show goes on (`catch`); the cleanup crew resets the stage either way (`finally`).

For async code, wrap `await` calls in `try/catch`; for promise chains, use `.catch()`.

> **Deeper note:** `throw` Error objects, not strings, so you keep a stack trace; subclass `Error` for typed handling (`class ApiError extends Error`). `finally` runs even if `try`/`catch` `return`s — and a `return` in `finally` overrides earlier returns (avoid). A `try/catch` around a non-awaited promise won't catch its rejection. Global safety nets: `window.onerror` / `unhandledrejection` in the browser, `process.on('uncaughtException')` in Node.

---

## 14. Common Intermediate Q&A (Rapid Fire)

**Q: Difference between `slice` and `splice`?**
`slice(start, end)` returns a copy and does **not** change the original. `splice(start, count, ...items)` **mutates** the array and returns the removed items.

**Q: How do you copy an object?**
Shallow: `{ ...obj }` or `Object.assign({}, obj)`. Deep: `structuredClone(obj)` (modern) or `JSON.parse(JSON.stringify(obj))` (loses functions/dates).

**Q: What is an IIFE?**
Immediately Invoked Function Expression — a function that runs the moment it's defined, used to create a private scope: `(function () { console.log("runs now"); })();`

**Q: What does `"use strict"` do?**
Enables strict mode: catches silent errors (like undeclared variables) and makes `this` `undefined` in plain function calls instead of the global object.

**Q: Difference between `for...of` and `for...in`?**
`for...of` loops over **values** (arrays, strings, iterables). `for...in` loops over **keys/indexes** (mainly objects, and includes inherited keys).

**Q: What is currying?**
Transforming a multi-argument function into a chain each taking one argument: `add(1)(2)(3)`. Full example on the Advanced page.

**Q: Difference between synchronous and asynchronous code?**
Synchronous runs line by line, each blocking the next. Asynchronous starts a task and continues, handling the result later via callbacks/promises.

**Q: What is the `arguments` object?**
An array-like object inside regular (non-arrow) functions holding all passed arguments. Modern code uses rest parameters (`...args`) instead.

**Q: How do you loop over an object's properties?**
`Object.keys`, `Object.values`, or `Object.entries`, then iterate:

```javascript
const user = { name: "Al", age: 30 };
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`); // "name: Al", "age: 30"
});
```

`for...in` also works but includes inherited keys, so the `Object.*` methods are usually safer.

---

Next: the **Advanced** page — functional programming, design patterns, performance, generators, proxies, polyfills, and the hardest interview questions.
