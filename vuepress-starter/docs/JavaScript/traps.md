---
title: Interviewer Traps
---

# Interviewer Trap Questions (Predict the Output)

These are the "gotcha" questions interviewers use to separate people who *memorized* JavaScript from people who *understand* it. Most are short "what does this print?" snippets where the obvious answer is wrong.

How to use this page: cover the answer, predict the output out loud, then read the explanation. Each trap ends with a **Deeper note** giving the precise rule, and a one-line **Say this** you can repeat in the interview. If you can explain *why* for every trap here, you'll handle almost anything they throw at you.

---

## 1. The `var` loop with `setTimeout`

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3   (not 0, 1, 2)
```

**Why:** `var` is function-scoped, so all three callbacks share the **same** `i`. The loop finishes (i becomes 3) long before any timeout fires, so every callback reads the final `3`. Swap `var` for `let` and you get `0, 1, 2`, because `let` creates a **fresh binding each iteration**.

> **Deeper note:** The timeouts are macrotasks — they only run after the synchronous loop completes. With `let`, the spec copies the loop variable into a new lexical environment per iteration, so each closure captures its own `i`. The classic pre-`let` fix was an IIFE: `(function(j){ setTimeout(()=>console.log(j),100) })(i)`.
>
> **Say this:** "`var` shares one binding; `let` makes a new one per iteration, and the closures capture the variable, not its value at schedule time."

---

## 2. `typeof null`

```javascript
console.log(typeof null);        // "object"  (not "null")
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"
console.log(typeof function(){});// "function"
console.log(typeof []);          // "object"
```

**Why:** `typeof null === "object"` is a famous bug from JavaScript's first implementation that can never be fixed (too much code depends on it). `NaN` is literally of type number ("Not a Number" is still a number value). Arrays are objects — use `Array.isArray()` to detect them.

> **Deeper note:** To reliably get an object's "type," use `Object.prototype.toString.call(x)` → `"[object Null]"`, `"[object Array]"`, `"[object Date]"`, etc. `typeof` is only fully trustworthy for `undefined`, `function`, and the primitive types other than `null`.
>
> **Say this:** "`typeof null` is `'object'` — a historical bug; I use `Array.isArray` for arrays and `Object.prototype.toString.call` when I need exact types."

---

## 3. `0.1 + 0.2`

```javascript
console.log(0.1 + 0.2);            // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);   // false
```

**Why:** Numbers are 64-bit floating point (IEEE-754). `0.1` and `0.2` can't be represented exactly in binary, so their sum is slightly off — just like `1/3` can't be written exactly in decimal.

The fix: compare with a tiny tolerance (epsilon), or work in integers (cents instead of dollars).

```javascript
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
```

> **Deeper note:** This affects all currency math — never store money as floats. Use integer minor units (cents) or a decimal library. `Number.EPSILON` is the smallest gap between 1 and the next representable number, the standard tolerance for float comparison.
>
> **Say this:** "Floats can't represent 0.1 exactly, so I compare with an epsilon tolerance or use integer cents for money."

---

## 4. `[] + []`, `[] + {}`, `{} + []`

```javascript
console.log([] + []);    // ""        (empty string)
console.log([] + {});    // "[object Object]"
console.log(1 + "1");    // "11"
console.log("5" - 2);    // 3
console.log("5" * "2");  // 10
```

**Why:** `+` triggers string concatenation if either side becomes a string. Arrays and objects coerce to strings via `toString()`: `[]` becomes `""`, `{}` becomes `"[object Object]"`. The other math operators (`-`, `*`, `/`) have no string meaning, so they coerce both sides to **numbers**.

> **Deeper note:** Coercion to a primitive calls `valueOf()` then `toString()`. `[].toString()` is `""`; `[1,2].toString()` is `"1,2"`. The notorious `{} + []` typed at the start of a console line is `0` because `{}` is parsed as an empty *block*, not an object, leaving `+[]` which is `0` — but inside an expression (like `console.log({} + [])`) it's `"[object Object]"`.
>
> **Say this:** "`+` prefers strings and coerces arrays/objects via toString; `-`, `*`, `/` coerce to numbers."

---

## 5. `NaN === NaN`

```javascript
console.log(NaN === NaN);          // false
console.log([NaN].includes(NaN));  // true   (!)
console.log([NaN].indexOf(NaN));   // -1     (!)
```

**Why:** `NaN` is the only value in JavaScript not equal to itself, by the IEEE-754 spec. So `===` and `indexOf` (which uses `===`) can't find it. But `includes` uses a slightly different algorithm (SameValueZero) that *does* match `NaN`.

Check for `NaN` with `Number.isNaN(x)`.

> **Deeper note:** Three equality algorithms matter: `===` (strict, `NaN !== NaN`), `Object.is` (SameValue, `Object.is(NaN, NaN)` is `true` but `Object.is(0, -0)` is `false`), and SameValueZero used by `includes`, `Map`, and `Set` (treats `NaN` equal and `0` === `-0`).
>
> **Say this:** "`NaN` isn't equal to itself, so `indexOf` fails but `includes` finds it; I test with `Number.isNaN`."

---

## 6. Hoisting and the Temporal Dead Zone

```javascript
console.log(a); // undefined   (var is hoisted as undefined)
var a = 1;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;
```

**Why:** Declarations are hoisted to the top of their scope. `var` is initialized to `undefined` immediately, so reading it early is allowed (just empty). `let`/`const` are hoisted too, but stay in the **Temporal Dead Zone** — unusable — until their declaration line runs.

> **Deeper note:** Only the *declaration* is hoisted, not the assignment. **Function declarations** are hoisted entirely (callable before they appear), but **function expressions** assigned to `var`/`let` are not. This is why `foo()` works above `function foo(){}` but not above `var foo = () => {}`.
>
> **Say this:** "`var` hoists as undefined; `let`/`const` hoist into the TDZ and throw if touched before their line."

---

## 7. Function declaration vs expression hoisting

```javascript
greet();              // "Hi!"   — works
function greet() { console.log("Hi!"); }

speak();              // TypeError: speak is not a function
var speak = function () { console.log("Hello!"); };
```

**Why:** `greet` is a function *declaration* — fully hoisted, so you can call it above its definition. `speak` is a function *expression* assigned to `var speak`; only `var speak` is hoisted (as `undefined`), so calling `speak()` before the assignment tries to invoke `undefined`.

> **Deeper note:** With `let speak = function(){}`, the early call throws a **ReferenceError** (TDZ) instead of a TypeError — a subtle tell interviewers love.
>
> **Say this:** "Declarations hoist fully; expressions only hoist the variable, so calling them early fails."

---

## 8. The `this` that gets lost

```javascript
const user = {
  name: "Alice",
  greet() { return `Hi, ${this.name}`; }
};

const fn = user.greet;
console.log(fn()); // "Hi, undefined"  (this is lost)

console.log(user.greet()); // "Hi, Alice"
```

**Why:** `this` is decided by **how a function is called**, not where it's defined. `user.greet()` calls it as a method (`this = user`). Assigning it to `fn` and calling `fn()` is a plain call, so `this` becomes `undefined` (strict mode) or the global object.

Fix with `.bind(user)`, an arrow wrapper, or calling it as `user.greet()`.

> **Deeper note:** This is exactly why passing `obj.method` as a callback (`setTimeout(user.greet, 100)`) breaks. React class components needed `this.handleClick = this.handleClick.bind(this)` for the same reason. Arrow methods or class field arrows avoid it because arrows have no own `this`.
>
> **Say this:** "`this` depends on the call site; detaching a method loses its receiver, so I bind it or use an arrow."

---

## 9. Arrow functions and `this`

```javascript
const counter = {
  count: 0,
  startBad() {
    setInterval(function () { this.count++; }, 1000); // this = window/undefined ❌
  },
  startGood() {
    setInterval(() => { this.count++; }, 1000);       // this = counter ✅
  }
};
```

**Why:** A normal `function` inside `setInterval` gets its own `this` (not `counter`). An arrow function has **no own `this`** — it uses the `this` of where it was written (`startGood`'s `this`, which is `counter`).

> **Deeper note:** Arrows also lack their own `arguments`, `super`, and `new.target`, and can't be constructors. That's why they're perfect for callbacks but wrong as object methods or prototype methods (where you *want* a dynamic `this`).
>
> **Say this:** "Arrows capture `this` lexically, so they keep the surrounding `this` inside callbacks."

---

## 10. `map` with `parseInt`

```javascript
console.log(["1", "2", "3"].map(parseInt)); // [1, NaN, NaN]  (not [1, 2, 3])
```

**Why:** `map` calls the callback with **three** arguments: `(value, index, array)`. So this becomes `parseInt("1", 0)`, `parseInt("2", 1)`, `parseInt("3", 2)`. The second argument is the **radix**! `parseInt("2", 1)` is invalid (no base-1), giving `NaN`; `parseInt("3", 2)` can't have a 3 in binary, also `NaN`.

Fix: `["1","2","3"].map(Number)` or `["1","2","3"].map(s => parseInt(s, 10))`.

> **Deeper note:** This is the headline example of "passing a built-in directly as a callback is risky" — the function may accept more parameters than you expect. The same bites `.map(String)` less harmfully, but `parseInt` is the classic.
>
> **Say this:** "`map` passes index as the second arg, which `parseInt` reads as the radix — I use `map(Number)` instead."

---

## 11. `sort` compares as strings

```javascript
console.log([1, 10, 2, 21, 3].sort()); // [1, 10, 2, 21, 3]  (string order!)
console.log([1, 10, 2, 21, 3].sort((a, b) => a - b)); // [1, 2, 3, 10, 21]
```

**Why:** Default `sort` converts elements to **strings** and compares Unicode code points, so `"10"` comes before `"2"`. Always pass a comparator for numbers.

Also note `sort` **mutates** the original array and returns it (the same reference).

> **Deeper note:** The comparator returns a negative/zero/positive number; `a - b` ascends, `b - a` descends. Sorting objects: `arr.sort((a,b) => a.age - b.age)`. To sort without mutating, copy first: `[...arr].sort(...)`. Since ES2019, `sort` is guaranteed **stable**.
>
> **Say this:** "Default sort is lexicographic and mutates — I always pass `(a,b)=>a-b` and copy first if I need the original."

---

## 12. `==` coercion surprises

```javascript
console.log(0 == "");        // false
console.log(0 == "0");       // true
console.log("" == "0");      // false
console.log(null == undefined); // true
console.log(null == 0);      // false
console.log([] == ![]);      // true   (!)
```

**Why:** `==` runs the Abstract Equality algorithm with messy coercion rules. The infamous `[] == ![]`: `![]` is `false` (arrays are truthy), then `[] == false` → `[] == 0` → `"" == 0` → `0 == 0` → `true`. These are exactly why everyone says "use `===`."

> **Deeper note:** `null` and `undefined` are loosely equal only to each other (and nothing else, not even `0`). The only widely-accepted `==` use is `x == null` to check for both `null` and `undefined` in one go.
>
> **Say this:** "Loose equality coerces unpredictably — I use `===` everywhere except `x == null` as a null/undefined check."

---

## 13. Object keys are strings

```javascript
const obj = {};
obj[1] = "number one";
obj["1"] = "string one";
console.log(obj[1]); // "string one"  — same key!

const a = {}, b = {};
const map = {};
map[a] = "x";
map[b] = "y";
console.log(map[a]); // "y"  — both keys became "[object Object]"
```

**Why:** Plain object keys are always **strings** (or symbols). The number `1` and string `"1"` become the same key. Two different objects both stringify to `"[object Object]"`, so they collide.

Use a `Map` when you need real keys of any type, including objects.

> **Deeper note:** `Map` preserves key types and insertion order, allows object keys, has a `.size`, and is iterable directly. Arrays are objects too, so their indices are really string keys under the hood.
>
> **Say this:** "Object keys coerce to strings, so I use a `Map` when keys are numbers, objects, or need their type preserved."

---

## 14. The async ordering puzzle

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Output: A, D, C, B
```

**Why:** `A` and `D` are synchronous — they run first. Then the stack empties. The event loop drains **microtasks** (promise callbacks → `C`) *before* **macrotasks** (`setTimeout` → `B`), even though the timeout is `0`.

> **Deeper note:** Microtasks (promise `.then`, `queueMicrotask`, `await` continuations) run completely after each synchronous run and before any timer/I-O macrotask. A microtask that schedules another microtask can delay timers indefinitely. `await x` is sugar for `.then`, so code after `await` is a microtask.
>
> **Say this:** "Sync first, then all microtasks (promises), then macrotasks (setTimeout) — so a resolved promise beats a zero-delay timeout."

---

## 15. `async` ordering with `await`

```javascript
async function run() {
  console.log("1");
  await null;
  console.log("2");
}
console.log("start");
run();
console.log("end");
// Output: start, 1, end, 2
```

**Why:** An `async` function runs synchronously **up to** the first `await`. So `1` prints immediately. `await` then schedules the rest (`2`) as a microtask and returns control, letting `end` print before `2`.

> **Deeper note:** Everything before the first `await` is synchronous; everything after is a microtask continuation. This is why an `async` function that does no awaiting before a `return` still resolves its promise asynchronously.
>
> **Say this:** "An async function is synchronous until the first await; the rest is queued as a microtask."

---

## 16. `const` does not mean immutable

```javascript
const user = { name: "Al" };
user.name = "Bob";      // ✅ allowed — mutating the object
user.age = 30;          // ✅ allowed
// user = {};           // ❌ TypeError — reassigning the binding

const list = [1, 2];
list.push(3);           // ✅ [1, 2, 3] — mutating is fine
```

**Why:** `const` freezes the **binding** (you can't point the variable at something else), not the **value**. The object's contents are still mutable. To freeze the contents, use `Object.freeze()` — but note that's **shallow**.

```javascript
const frozen = Object.freeze({ a: 1, nested: { b: 2 } });
frozen.a = 9;          // ignored (silently, or throws in strict mode)
frozen.nested.b = 9;   // ✅ still changes — freeze is shallow!
```

> **Deeper note:** Deep immutability needs recursive freezing or a `structuredClone` + freeze, or a library. `Object.freeze` returns the same object and fails silently in non-strict mode, which hides bugs.
>
> **Say this:** "`const` stops reassignment, not mutation; `Object.freeze` blocks mutation but only one level deep."

---

## 17. Shallow copy sharing

```javascript
const original = { name: "Al", address: { city: "Paris" } };
const copy = { ...original };

copy.name = "Bob";              // independent — fine
copy.address.city = "London";   // mutates BOTH!
console.log(original.address.city); // "London"
```

**Why:** Spread (`{...obj}`) and `Object.assign` make a **shallow** copy — top-level primitives are copied, but nested objects are still **shared references**. Changing `copy.address` changes `original.address` too.

Deep copy with `structuredClone(original)`.

> **Deeper note:** `JSON.parse(JSON.stringify(obj))` also deep-copies but drops functions, `undefined`, and `Date`/`Map`/`Set`, and throws on circular references. `structuredClone` handles dates, maps, sets, and cycles — the modern best answer.
>
> **Say this:** "Spread is a shallow copy, so nested objects stay shared — I use `structuredClone` for a true deep copy."

---

## 18. Reference equality

```javascript
console.log({} === {});           // false
console.log([] === []);           // false
console.log([1,2] == [1,2]);      // false
const a = []; const b = a;
console.log(a === b);             // true (same reference)
```

**Why:** Objects and arrays are compared by **reference**, not contents. Two separately-created objects are never `===`, even if identical. They're equal only when both variables point to the *same* object in memory.

> **Deeper note:** To compare contents, compare field by field, `JSON.stringify` both (order-sensitive, lossy), or use a deep-equal utility. This is also why `useEffect`/`useMemo` dependency arrays in React re-run when you pass a new object literal each render.
>
> **Say this:** "Objects compare by reference, so equal-looking literals aren't `===`; I deep-compare when I need value equality."

---

## 19. Automatic Semicolon Insertion (ASI)

```javascript
function getUser() {
  return
    { name: "Al" };   // returns undefined!
}
console.log(getUser()); // undefined
```

**Why:** JavaScript auto-inserts a semicolon after `return` when the next token is on a new line. So this becomes `return;` and the object literal is dead code. Always put the value on the **same line** as `return`.

> **Deeper note:** ASI also bites with lines starting with `(` or `[` — e.g. a line ending without `;` followed by `(...)` can be parsed as a function call. Keeping `return value` on one line and using a consistent semicolon style avoids the whole class of bugs.
>
> **Say this:** "ASI inserts a semicolon after a bare `return` on its own line, so the return value must be on the same line."

---

## 20. Increment, closures, and the leaking global

```javascript
function foo() {
  count = 5;   // no var/let/const — creates a GLOBAL (non-strict mode)
}
foo();
console.log(count); // 5  (leaked to global scope)
```

**Why:** Assigning to a never-declared variable in non-strict mode creates a property on the global object instead of a local variable. It silently leaks and can cause hard-to-find bugs. `"use strict"` turns this into a `ReferenceError`.

> **Deeper note:** ES modules and class bodies are strict by default, so this throws there automatically. Always declare variables; enable strict mode or use modules to make accidental globals an error rather than a silent leak.
>
> **Say this:** "Assigning to an undeclared variable leaks a global in sloppy mode — strict mode and modules turn it into an error."

---

## 21. `forEach` ignores `await`

```javascript
async function process(items) {
  items.forEach(async (item) => {
    await save(item);            // these do NOT run in sequence
  });
  console.log("done");          // logs BEFORE any save finishes
}
```

**Why:** `forEach` does not wait for the async callbacks — it fires them all and moves on immediately, so `"done"` logs before any `save` completes, and you can't catch their errors. Use a `for...of` loop with `await` for sequential work, or `Promise.all(items.map(save))` for parallel.

```javascript
for (const item of items) await save(item);          // sequential
await Promise.all(items.map(item => save(item)));     // parallel
```

> **Deeper note:** `forEach` was designed before promises and ignores the returned promise entirely. `for...of` respects `await` (sequential); `map` + `Promise.all` runs them concurrently and waits for all — pick based on whether the tasks depend on each other.
>
> **Say this:** "`forEach` doesn't await its callback — I use `for...of` for sequential awaits or `Promise.all(map(...))` for parallel."

---

## 22. Default parameters and `arguments`

```javascript
console.log((function () { return arguments.length; })(1, 2, 3)); // 3

const arrow = (...args) => args.length;
console.log(arrow(1, 2, 3)); // 3  (arrows have no `arguments`, use rest)

[1, 2, 3].forEach((n) => {
  // `arguments` here would refer to an OUTER function, not forEach — a trap
});
```

**Why:** Regular functions have an `arguments` object; arrow functions do **not** (they inherit `arguments` from their enclosing scope, which is a common source of confusion). Modern code uses rest parameters (`...args`), which give a real array in both.

> **Deeper note:** `arguments` is array-*like* (has `length` and indices) but lacks array methods — you'd do `Array.from(arguments)` or `[...arguments]`. Rest parameters are a true array and are clearer, so prefer them.
>
> **Say this:** "Arrows have no `arguments`; I use rest params, which give a real array everywhere."

---

## 23. Floating index and sparse arrays

```javascript
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr.length);       // 11  (not 4)
console.log(arr);              // [1, 2, 3, <7 empty>, 11]
console.log(arr[5]);          // undefined

console.log([1, , 3].map(x => x * 2)); // [2, <empty>, 6]  — map skips the hole
```

**Why:** Setting a far index creates a **sparse array** with empty slots, and `length` jumps to the highest index + 1. Iteration methods like `map`, `forEach`, and `filter` **skip** empty slots (they aren't `undefined`, they're holes), which produces confusing results.

> **Deeper note:** A hole is different from an explicit `undefined`. `Object.keys([1,,3])` is `["0","2"]` (no `"1"`). `Array.from({length:3})` and `[...Array(3)]` create real `undefined` entries you can map over, unlike `new Array(3)`.
>
> **Say this:** "Assigning a far index makes a sparse array with holes that map/forEach skip — I avoid holes and use `Array.from` to fill."

---

## 24. The `try/finally` return override

```javascript
function test() {
  try {
    return "from try";
  } finally {
    return "from finally";   // this wins!
  }
}
console.log(test()); // "from finally"
```

**Why:** `finally` always runs, and if it `return`s (or throws), it **overrides** whatever `try` or `catch` was about to return. This silently swallows the real return value (and even swallows exceptions). Avoid `return`/`throw` inside `finally`.

> **Deeper note:** `finally` is for cleanup (closing files, clearing timers), not control flow. A thrown error in `try` is discarded if `finally` returns — one of the sneakiest ways to hide a bug.
>
> **Say this:** "A `return` in `finally` overrides the try/catch return and even swallows errors — `finally` should only clean up."

---

# Advanced / Senior Traps

The traps above clear most interviews. The ones below show up in **hard senior rounds** — prototypes, coercion internals, Symbols, BigInt, and the stateful built-ins. Same drill: predict, then read why.

---

## 25. `Object.is` vs `===`

```javascript
console.log(0 === -0);             // true
console.log(Object.is(0, -0));     // false
console.log(NaN === NaN);          // false
console.log(Object.is(NaN, NaN));  // true
```

**Why:** `===` says `0` and `-0` are equal and `NaN` is not equal to itself. `Object.is` fixes exactly those two edge cases — it treats `NaN` as equal to itself and `-0` as distinct from `+0`. Everything else behaves like `===`.

> **Deeper note:** `-0` appears from `-1 * 0`, `0 / -1`, or `Math.round(-0.2)`. Detect it with `Object.is(x, -0)` or `1 / x === -Infinity`. `includes`, `Map`, and `Set` use **SameValueZero**, which matches `NaN` but treats `0 === -0`.
>
> **Say this:** "`Object.is` is like `===` except it distinguishes `-0` and treats `NaN` as equal to itself."

---

## 26. `__proto__` vs `prototype`

```javascript
function Dog() {}
const d = new Dog();

console.log(d.prototype);                       // undefined — instances don't have one
console.log(Dog.prototype);                      // { constructor: Dog }
console.log(d.__proto__ === Dog.prototype);      // true
console.log(Object.getPrototypeOf(d) === Dog.prototype); // true
```

**Why:** `prototype` is a property on **constructor functions** — the object that becomes the parent of instances created with `new`. `__proto__` is the actual link **on the instance** pointing to that prototype. People mix them up constantly: instances have `__proto__`, not `prototype`.

> **Deeper note:** `__proto__` is a legacy accessor; prefer `Object.getPrototypeOf(obj)` and `Object.setPrototypeOf`. The chain is `d` → `Dog.prototype` → `Object.prototype` → `null`. Changing a prototype at runtime deoptimizes engines, so set it at creation.
>
> **Say this:** "`prototype` lives on the constructor; `__proto__` is the instance's link to it — I read it with `Object.getPrototypeOf`."

---

## 27. `Object.create(null)` — the bare object

```javascript
const map = Object.create(null);
map.key = "value";

console.log(map.key);        // "value"
console.log(map.toString);   // undefined — no inherited methods at all
// console.log(map.toString()); // TypeError: map.toString is not a function
console.log("toString" in {}); // true (normal objects inherit it)
```

**Why:** `Object.create(null)` makes an object with **no prototype**, so it inherits nothing — no `toString`, no `hasOwnProperty`. That's actually desirable for a pure dictionary/lookup, because no key can collide with an inherited method name.

> **Deeper note:** This is the safe way to use an object as a hash map (or just use a real `Map`). A normal `{}` inherits from `Object.prototype`, so a key like `"toString"` or `"constructor"` is "present" via inheritance and can confuse `in` checks.
>
> **Say this:** "`Object.create(null)` has no prototype, so it's a clean dictionary with no inherited keys to collide with."

---

## 28. The `hasOwnProperty` hijack

```javascript
const obj = { hasOwnProperty: () => "hijacked" };

console.log(obj.hasOwnProperty("x"));                       // "hijacked" — wrong!
console.log(Object.hasOwn(obj, "x"));                        // false (modern, safe)
console.log(Object.prototype.hasOwnProperty.call(obj, "x")); // false (classic, safe)
```

**Why:** If the object itself defines a `hasOwnProperty` key (common when objects come from user data or JSON), calling `obj.hasOwnProperty()` runs **their** version, not the real one. Always call it via `Object.prototype` or use the modern `Object.hasOwn`.

> **Deeper note:** Same risk for any `Object.prototype` method you call directly on untrusted data. `Object.hasOwn(obj, key)` (ES2022) is the recommended replacement and also works on `Object.create(null)` objects, which don't have `hasOwnProperty` at all.
>
> **Say this:** "Never call `obj.hasOwnProperty` directly on untrusted data — I use `Object.hasOwn(obj, key)`."

---

## 29. Symbol keys are invisible

```javascript
const id = Symbol("id");
const user = { [id]: 123, name: "Al" };

console.log(Object.keys(user));        // ["name"]   — symbol key hidden
console.log(JSON.stringify(user));      // {"name":"Al"} — symbol dropped
console.log(user[id]);                  // 123 (still accessible directly)
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]
```

**Why:** Symbol-keyed properties are skipped by `Object.keys`, `for...in`, and `JSON.stringify`. They're a deliberate "hidden" metadata channel — accessible only if you have the symbol itself or call `Object.getOwnPropertySymbols`.

> **Deeper note:** This makes Symbols useful for library metadata that shouldn't leak into iteration or serialization. Well-known symbols like `Symbol.iterator` and `Symbol.toPrimitive` customize built-in behaviors.
>
> **Say this:** "Symbol keys are excluded from `keys`, `for...in`, and JSON — they're a hidden property channel."

---

## 30. BigInt won't mix with Number

```javascript
console.log(typeof 10n);    // "bigint"
console.log(10n === 10);    // false (different types)
console.log(10n == 10);     // true  (loose equality coerces)
console.log(10n + 5n);      // 15n
// console.log(10n + 5);    // TypeError: Cannot mix BigInt and other types
```

**Why:** `BigInt` is a separate numeric type for integers beyond `Number.MAX_SAFE_INTEGER`. You **cannot** mix it with regular numbers in arithmetic — you must convert one side explicitly (`10n + BigInt(5)` or `Number(10n) + 5`).

> **Deeper note:** BigInt has no decimals (`10n / 3n === 3n`, truncated) and isn't valid in JSON. Use it for large IDs, timestamps in nanoseconds, or precise integer math; use `Number` for everything else.
>
> **Say this:** "BigInt and Number can't be mixed in math — I convert one side; `==` coerces but `===` doesn't."

---

## 31. String length vs visible characters

```javascript
console.log("👍".length);        // 2  (one emoji, two UTF-16 code units)
console.log([..."👍"].length);   // 1  (spread iterates code points)
console.log("👍".charAt(0));     // "�" broken half of the surrogate pair
console.log([..."a👍b"]);        // ["a", "👍", "b"]
```

**Why:** Strings are sequences of **UTF-16 code units**, and many emoji/characters take two units (a surrogate pair). So `.length`, indexing, and `charAt` count units, not visible characters. Spreading or `Array.from` iterates by **code point**, giving the human-expected count.

> **Deeper note:** Reversing a string with `split("").reverse().join("")` corrupts emoji; use `[...str].reverse().join("")`. Grapheme clusters (like flag emoji or skin-tone modifiers) can be even more code points — `Intl.Segmenter` handles those.
>
> **Say this:** "`.length` counts UTF-16 units, so emoji read as 2 — I spread the string to count real characters."

---

## 32. `toFixed` rounding

```javascript
console.log((1.005).toFixed(2)); // "1.00"  (not "1.01"!)
console.log((0.1).toFixed(1));   // "0.1"
console.log((2.35).toFixed(1));  // "2.4" or "2.3" depending on the engine
```

**Why:** `1.005` can't be stored exactly — it's really `1.00499999...`, so `toFixed(2)` rounds **down** to `"1.00"`. The same float imprecision from trap #3 strikes again, this time hidden inside rounding.

> **Deeper note:** For correct rounding, scale to integers first: `Math.round(1.005 * 100) / 100`, or use a decimal library / `Intl.NumberFormat` for display. Never rely on `toFixed` for financial rounding.
>
> **Say this:** "`toFixed` rounds the imprecise stored float, so `1.005` becomes `1.00` — I round via scaled integers for money."

---

## 33. `JSON.stringify` silently drops things

```javascript
const data = { a: undefined, b: () => {}, c: NaN, d: Infinity, e: new Date(0), f: 1n };
// console.log(JSON.stringify(data)); // 1n throws: BigInt not serializable

const safe = { a: undefined, b: () => {}, c: NaN, d: Infinity, e: new Date(0) };
console.log(JSON.stringify(safe));
// {"c":null,"d":null,"e":"1970-01-01T00:00:00.000Z"}
console.log(JSON.stringify([undefined, () => {}, Symbol()])); // "[null,null,null]"
```

**Why:** `JSON.stringify` **omits** `undefined`, functions, and symbols in objects; turns `NaN`/`Infinity` into `null`; converts `Date` via its `toJSON()` to a string; and **throws** on `BigInt`. In arrays, the omitted values become `null` to preserve positions.

> **Deeper note:** Objects can define a `toJSON()` to control their serialized form (that's how `Date` works). The 2nd arg (replacer) and 3rd arg (indentation) let you filter/format. Round-tripping through JSON is lossy — it's not a clone tool for rich data.
>
> **Say this:** "`stringify` drops undefined/functions/symbols, nulls out NaN/Infinity, calls `toJSON`, and throws on BigInt."

---

## 34. `??` mixed with `||` is a syntax error

```javascript
// const x = a ?? b || c;     // SyntaxError: cannot mix ?? with || or &&
const x = (a ?? b) || c;       // OK — parentheses required
const y = a ?? (b || c);       // OK — different meaning
```

**Why:** The language **forbids** combining `??` with `||` or `&&` without parentheses, because the intended precedence is ambiguous and people would get it wrong. You must parenthesize to state which grouping you mean.

> **Deeper note:** This is one of very few syntax errors driven by readability rather than grammar limits. Remember `??` only falls back on `null`/`undefined`, while `||` falls back on any falsy value — so the two groupings genuinely differ.
>
> **Say this:** "You can't mix `??` with `||`/`&&` unparenthesized — it's a deliberate syntax error to avoid ambiguity."

---

## 35. Optional chaining only guards one link

```javascript
const a = { b: undefined };

console.log(a?.b?.c);   // undefined — safe, both links guarded
console.log(a?.b.c);    // TypeError: Cannot read 'c' of undefined
```

**Why:** `?.` short-circuits only the property **immediately to its left**. In `a?.b.c`, the `?.` guards `a`, but once `a.b` is `undefined`, the plain `.c` after it still throws. You need `?.` on **every** link that might be nullish.

> **Deeper note:** When the left side is nullish, `?.` short-circuits the **entire** remaining chain to `undefined` (it doesn't evaluate calls or indexes further right). It also guards calls (`obj.fn?.()`) and dynamic access (`obj?.[key]`). Don't overuse it — masking a `null` that *shouldn't* happen hides bugs.
>
> **Say this:** "`?.` only protects the link it's attached to, so I put it on every part of the chain that can be nullish."

---

## 36. Generators (and iterators) are consumed once

```javascript
function* gen() { yield 1; yield 2; }
const g = gen();

console.log([...g]); // [1, 2]
console.log([...g]); // []  — already exhausted

const set = new Set([1, 2]);
console.log([...set], [...set]); // [1,2] [1,2] — Set is re-iterable
```

**Why:** A generator produces a **one-shot** iterator. Once you iterate it to the end (via spread, `for...of`, `Array.from`), it's done — iterating again yields nothing. Collections like `Array`, `Set`, and `Map` are re-iterable because each loop requests a **fresh** iterator.

> **Deeper note:** This bites when you store a generator result and iterate twice, or pass it to two functions. If you need to reuse the values, materialize them once: `const arr = [...gen()]`. The raw iterator returned by `arr.values()` is also one-shot.
>
> **Say this:** "Generators give a single-use iterator — I spread it into an array once if I need the values more than once."

---

## 37. `Date`: 0-indexed months and mutability

```javascript
console.log(new Date(2024, 11, 25).toDateString()); // Wed Dec 25 2024 (11 = December!)
console.log(new Date(2024, 12, 1).toDateString());  // Jan 1 2025 (month 12 overflows)

const d = new Date(2024, 0, 1);
d.setMonth(5);            // mutates d in place
console.log(d.getMonth()); // 5 (June) — original object changed
```

**Why:** In the `Date` constructor and `getMonth`/`setMonth`, **months are 0-indexed** (January is 0, December is 11), while days are 1-indexed — a constant source of off-by-one bugs. `Date` objects are also **mutable**, so `setX` methods change the original.

> **Deeper note:** Out-of-range values roll over (month 12 → next January, day 0 → last day of previous month — handy for "last day of month"). `new Date("2024-12-25")` parses as **UTC**, while `new Date(2024, 11, 25)` is **local time** — a frequent timezone bug. Many teams use `Temporal` (newer) or date libraries to avoid all this.
>
> **Say this:** "`Date` months are 0-indexed and `Date` is mutable, and string-vs-number constructors differ on timezone."

---

## 38. Regex `lastIndex` with the `g` flag

```javascript
const re = /\d/g;
console.log(re.test("1")); // true
console.log(re.test("1")); // false (!)  — same string, different result
```

**Why:** A regex with the **global (`g`) flag** is **stateful**: `test`/`exec` remember `lastIndex` and resume from there. After the first match `lastIndex` is `1`; the second `test("1")` starts past the end, fails, and resets `lastIndex` to `0`. Reusing one global regex across calls causes alternating true/false.

> **Deeper note:** Don't share a `/g` (or `/y` sticky) regex across calls if you rely on `test`. Either drop the `g` flag, create a fresh regex each time, or reset `re.lastIndex = 0`. `String.prototype.matchAll` is the clean way to get all matches without managing `lastIndex` yourself.
>
> **Say this:** "A `/g` regex keeps `lastIndex` between `test`/`exec` calls, so reusing it flips results — I avoid sharing it or use `matchAll`."

---

## 39. Setting `length` truncates the array

```javascript
const arr = [1, 2, 3, 4, 5];
arr.length = 3;
console.log(arr);        // [1, 2, 3] — last two are gone
arr.length = 5;
console.log(arr);        // [1, 2, 3, <2 empty>] — holes, not undefined
arr.length = 0;
console.log(arr);        // [] — a quick way to empty an array
```

**Why:** `length` is a **writable** property, not just a readout. Lowering it deletes the overflow elements; raising it adds empty holes. Setting it to `0` clears the array in place (useful when other references must see the change).

> **Deeper note:** This works because arrays are objects with a special `length` invariant. The re-grown slots are holes (trap #23), skipped by `map`/`forEach`. To empty an array you can also reassign `arr = []`, but that only works if nothing else holds the old reference.
>
> **Say this:** "`length` is writable — lowering it truncates, and `arr.length = 0` empties the array in place."

---

## 40. `typeof` is safe — except in the TDZ

```javascript
console.log(typeof neverDeclared); // "undefined" — no error, even though it doesn't exist

console.log(typeof tdzVar);        // ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = 1;
```

**Why:** `typeof` on a completely **undeclared** identifier safely returns `"undefined"` instead of throwing — historically the safe way to feature-detect a global. But `typeof` on a `let`/`const` variable **before its declaration line** still throws, because the Temporal Dead Zone overrides that safety.

> **Deeper note:** This is why old code wrote `typeof module !== "undefined"` to detect environments. With `let`/`const`, the TDZ wins — there is no safe early access at all. Bare `neverDeclared` (without `typeof`) throws a `ReferenceError`.
>
> **Say this:** "`typeof` on an undeclared variable is safe and returns `'undefined'`, but on a TDZ `let` it still throws."

---

## 41. `for...in` order and inherited keys

```javascript
const obj = { 2: "a", 1: "b", name: "c" };
for (const k in obj) console.log(k); // "1", "2", "name"  — integer keys sorted first!

Array.prototype.custom = "oops";
for (const k in [10, 20]) console.log(k); // "0", "1", "custom" — inherited key leaks in
delete Array.prototype.custom;
```

**Why:** `for...in` visits **integer-like keys in ascending numeric order first** (regardless of insertion order), then string keys in insertion order — and it also walks **inherited enumerable** properties up the prototype chain. Both surprise people who expect insertion order or own-keys-only.

> **Deeper note:** Use `for...of` with `Object.keys/entries` for own keys in a predictable order, or guard with `Object.hasOwn(obj, k)`. `for...in` on arrays is doubly risky (string indices + inherited props) — never use it to iterate arrays.
>
> **Say this:** "`for...in` sorts integer keys first and includes inherited ones — I use `Object.keys`/`entries` instead."

---

## 42. Numbers beyond the safe integer limit

```javascript
console.log(Number.MAX_SAFE_INTEGER);            // 9007199254740991
console.log(9007199254740992 === 9007199254740993); // true (!) — both round to the same float
console.log(9007199254740992 + 1);               // 9007199254740992 (the +1 vanishes)
```

**Why:** Doubles can represent integers exactly only up to `2^53 - 1`. Beyond that, consecutive integers share the same binary representation, so distinct big numbers compare equal and increments silently disappear. This bites with large database IDs and Twitter/Discord-style snowflake IDs.

> **Deeper note:** Use `BigInt` (`9007199254740993n`) for exact large integers, or keep big IDs as **strings** when they come from an API. `Number.isSafeInteger(x)` checks whether a value is in the exact range.
>
> **Say this:** "Past `2^53` integers lose precision, so big IDs need BigInt or strings, not Number."

---

## 43. Coercion order: `valueOf` vs `toString`

```javascript
const obj = {
  valueOf() { return 42; },
  toString() { return "hello"; }
};

console.log(obj + 1);       // 43      ("default" hint → valueOf)
console.log(`${obj}`);      // "hello"  ("string" hint → toString)
console.log(Number(obj));   // 42       ("number" hint → valueOf)
console.log(String(obj));   // "hello"  ("string" hint → toString)
```

**Why:** When an object is coerced to a primitive, the engine picks a **hint**. For `+` and `==` the hint is "default" (tries `valueOf` first); for math/`Number()` it's "number" (`valueOf` first); for template literals/`String()` it's "string" (`toString` first). Same object, different result depending on context.

> **Deeper note:** You can override all of it with `Symbol.toPrimitive`: `{ [Symbol.toPrimitive](hint) { return hint === "string" ? "hi" : 7; } }`. This is exactly how `Date` returns a number for `-` but a string for `+`.
>
> **Say this:** "Object-to-primitive coercion uses a hint — `valueOf` for number/default, `toString` for string — overridable via `Symbol.toPrimitive`."

---

## 44. Spread runs getters and is shallow

```javascript
const source = {
  get val() { console.log("getter ran"); return 1; }
};

const copy = { ...source }; // logs "getter ran" immediately
console.log(Object.getOwnPropertyDescriptor(copy, "val"));
// { value: 1, writable: true, enumerable: true, configurable: true } — a plain value, not a getter

class A { hi() {} }
const inst = new A();
console.log({ ...inst }.hi); // undefined — spread copies own props only, not the prototype
```

**Why:** Spreading (and `Object.assign`) **invokes getters** and copies the resulting **values**, not the accessor definitions — so a lazy getter runs at copy time and becomes an eager data property. It also only copies **own enumerable** properties, so prototype/class methods are left behind.

> **Deeper note:** To copy property descriptors (keeping getters as getters), use `Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))`. To preserve the prototype, use `Object.create(Object.getPrototypeOf(src), Object.getOwnPropertyDescriptors(src))`. And remember it's still a **shallow** copy (trap #17).
>
> **Say this:** "Spread invokes getters into plain values and copies own enumerable props only — class methods and accessor-ness are lost."

---

## How to handle traps in the room

When you get a "what does this print?" question, narrate your reasoning instead of blurting an answer:

1. **Name the mechanism** — "this is about hoisting / the event loop / coercion."
2. **Walk the steps out loud** — interviewers grade your reasoning, not just the final value.
3. **State the rule and the fix** — show you'd write the correct version in real code.
4. **If unsure, reason from first principles** — "+ prefers strings, so..." beats guessing.

If you can explain the *why* behind every trap on this page, you understand JavaScript's genuinely tricky parts better than most candidates. Combine this with the Basics, Intermediate, and Advanced pages and you're ready for anything an interviewer asks.
