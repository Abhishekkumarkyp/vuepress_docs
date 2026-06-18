---
title: Introduction to JavaScript
---

# JavaScript Basics (Interview & Exam Prep)

Welcome! This page builds your foundation from zero. Every concept is explained in plain language, paired with a real-life analogy you can picture, and followed by a short **Deeper note** for readers who already know the basics and want the precise, interview-grade detail.

How to read this page: if you are new, focus on the explanations and analogies. If you are experienced, skim to the **Deeper note** boxes and the Q&A at the end. Type out every example yourself — reading code is not the same as knowing it.

---

## 1. What is JavaScript

JavaScript is a high-level, interpreted programming language that runs in every web browser. It is what makes web pages *do things* — respond to clicks, update content without reloading, validate forms, animate, and talk to servers. HTML is the structure of a page, CSS is the styling, and JavaScript is the behavior.

**Analogy:** Think of a web page as a house. HTML is the bricks and rooms (structure), CSS is the paint and furniture (appearance), and JavaScript is the electricity and plumbing (the things that actually *work* when you flip a switch or turn a tap).

```javascript
// Display a simple alert message
alert("Welcome to JavaScript!");
```

> **Deeper note:** "High-level" means it manages memory for you and hides CPU details. "Interpreted" is a simplification — modern engines (V8 in Chrome/Node, SpiderMonkey in Firefox) use **JIT (Just-In-Time) compilation**: they compile hot code paths to machine code at runtime for speed. JavaScript follows the **ECMAScript** specification; "ES6", "ES2020" etc. are versions of that spec. It also runs outside the browser via **Node.js** on servers, desktops, and tooling.

---

## 2. Setup & Environment

To start, you only need a text editor and a web browser. Popular editors include Visual Studio Code, Sublime Text, and others. Create a file ending in `.js`, link it from an HTML file, and open that HTML file in a browser. You can also open the browser **DevTools console** (press F12) and type JavaScript directly.

**Analogy:** The editor is your kitchen where you prepare the dish, and the browser is the dining table where it's served. The console is like tasting a spoonful straight from the pot — instant feedback before you serve the whole meal.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Setup</title>
</head>
<body>
  <script src="script.js"></script>
</body>
</html>
```

> **Deeper note:** Place `<script>` just before the closing `</body>` tag, or add the `defer` attribute, so the HTML is parsed before your script runs (otherwise `document.getElementById` may find nothing). `defer` downloads the script in parallel and runs it after parsing; `async` runs it as soon as it downloads, in no guaranteed order. For server-side or tooling work, install **Node.js** and run files with `node script.js`.

---

## 3. Variables & Data Types

Variables are named containers for values. You declare them with `let`, `const`, or the older `var`. JavaScript values come in a few **types**: strings (text), numbers, booleans (`true`/`false`), arrays, objects, and a few special ones.

**Analogy:** A variable is a labeled box. The label is the name (`age`), and the box holds the value (`30`). `const` is a box you seal shut — you can't swap its contents for something else. `let` is a box you can refill.

```javascript
let name = "John";     // can be reassigned later
const age = 30;        // cannot be reassigned
var isStudent = true;  // old style — avoid in new code

console.log(typeof name);      // "string"
console.log(typeof age);       // "number"
console.log(typeof isStudent); // "boolean"
```

> **Deeper note:** JavaScript has **7 primitive types** — `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint` — and everything else is an `object`. Numbers are IEEE-754 64-bit floats, which is why `0.1 + 0.2 === 0.30000000000000004`. Use `bigint` (`10n`) for integers beyond `Number.MAX_SAFE_INTEGER`. A classic gotcha: `typeof null` returns `"object"` (a historical bug that can never be fixed).

---

## 4. Operators & Expressions

Operators are symbols that perform actions: arithmetic (`+ - * /`), assignment (`=`), comparison (`> < === !==`), and logical (`&& || !`). An **expression** is any combination that produces a value.

**Analogy:** Operators are like the buttons on a calculator, and an expression is the full sum you punch in. `(10 + 5) * 2` is one expression that evaluates down to a single number, just like a calculation collapses to one answer.

```javascript
let x = 10, y = 5;
console.log(x + y); // 15
console.log(x > y); // true
console.log(x === y); // false

let p = true, q = false;
console.log(p && q); // false  (AND: both must be true)
console.log(p || q); // true   (OR: at least one true)
```

> **Deeper note:** `&&` and `||` are **short-circuit** operators and return one of their *operands*, not a boolean. `a && b` returns `a` if `a` is falsy, else `b`; `a || b` returns `a` if `a` is truthy, else `b`. This powers idioms like `const name = input || "Guest"`. Modern code prefers `??` (nullish coalescing) when only `null`/`undefined` should trigger the fallback. Watch operator **precedence**: `*` binds tighter than `+`, and `&&` tighter than `||`.

---

## 5. Control Flow & Conditionals

Control flow decides *which* code runs and *how many times*. `if`/`else if`/`else` choose between branches; loops (`for`, `while`) repeat work.

**Analogy:** Conditionals are a fork in the road — "if it's raining, take an umbrella, else wear sunglasses." A loop is like doing push-ups: repeat the same action until you hit your target count.

```javascript
let time = 12;
if (time < 12) {
  console.log("Good morning!");
} else if (time < 18) {
  console.log("Good afternoon!");
} else {
  console.log("Good evening!");
}

for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}
```

> **Deeper note:** Beyond `if`, you have the **ternary** (`cond ? a : b`) for short expressions, `switch` for many discrete cases (remember `break`, or cases fall through), and the loop variants `for...of` (values), `for...in` (keys), `forEach`, and `while`/`do...while`. `break` exits a loop; `continue` skips to the next iteration. Prefer `for...of` and array methods over manual index loops for readability.

---

## 6. Functions

A function is a reusable block of code that performs a task. You define it once and call it many times, optionally passing in **parameters** and getting back a value with `return`.

**Analogy:** A function is like a coffee machine. You put in ingredients (arguments), it runs a fixed process inside, and it hands back a result (the coffee). You don't rebuild the machine each morning — you just press the button again.

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("John")); // "Hello, John!"

// Same thing as an arrow function
const greetArrow = (name) => `Hello, ${name}!`;
```

> **Deeper note:** There are three forms — function **declarations** (hoisted, callable before they appear), function **expressions** (assigned to a variable, not hoisted as callable), and **arrow functions** (no own `this`, no `arguments`, can't be `new`-ed). A function that takes or returns another function is a **higher-order function** — the basis of `map`, `filter`, callbacks, and closures, all covered on the next page.

---

## 7. Arrays and Objects

Arrays and objects store **collections**. An array is an ordered list accessed by numeric index (`fruits[0]`). An object is a set of named key–value pairs accessed by key (`person.name`).

**Analogy:** An array is an egg carton — slots in a fixed order, you grab slot 0, slot 1, slot 2. An object is a labeled spice rack — you don't care about order, you reach for the jar labeled "salt" by name.

```javascript
let fruits = ["Apple", "Banana", "Orange"];
let person = { name: "John", age: 30, isStudent: true };

console.log(fruits[0]);   // "Apple"
console.log(person.name); // "John"
```

> **Deeper note:** Arrays *are* objects under the hood (indices are string keys). Both are **reference types** (section 17). Know the workhorse array methods cold: `map`, `filter`, `reduce`, `find`, `some`, `every`, `includes`, `sort`, `slice` (copies) vs `splice` (mutates). For objects, `Object.keys/values/entries` let you iterate, and spread (`{ ...obj }`) makes a shallow copy.

---

## 8. DOM Manipulation

The DOM (Document Object Model) is the browser's live, tree-shaped representation of your HTML. JavaScript reads and changes this tree to update the page on the fly.

**Analogy:** The DOM is like a family tree drawn on a whiteboard. Each HTML element is a name on the tree. JavaScript is the marker you use to add a new branch, erase a name, or rewrite one — and the page updates instantly to match the whiteboard.

```html
<p id="demo">JavaScript can change HTML content.</p>

<script>
  document.getElementById("demo").innerHTML = "Hello, World!";
</script>
```

> **Deeper note:** Prefer modern selectors: `document.querySelector("#demo")` and `querySelectorAll(".item")`. Use `textContent` instead of `innerHTML` when inserting user data to avoid **XSS** injection. DOM updates trigger **reflow/repaint**, which is expensive — batch changes (build with a `DocumentFragment`, or change a class instead of many inline styles) for performance.

---

## 9. Events

Events are things that happen in the browser — a click, a keypress, a page load. You respond to them by attaching an **event listener** that runs your code when the event fires.

**Analogy:** An event listener is like a doorbell. You wire it up once ("when someone presses the button, ring the bell"), then go about your day. You don't stand at the door waiting — the bell notifies you when it matters.

```html
<button id="myButton">Click me</button>

<script>
  document.getElementById("myButton").addEventListener("click", function () {
    alert("Button clicked!");
  });
</script>
```

> **Deeper note:** Events travel in two phases — **capturing** (top → target) then **bubbling** (target → top); handlers fire on bubbling by default. **Event delegation** (one listener on a parent, using `e.target`) is the efficient pattern for many children and is a very common interview topic, covered on the Intermediate page. `e.preventDefault()` cancels the default action; `e.stopPropagation()` halts bubbling.

---

## 10. Error Handling

Error handling lets your program recover instead of crashing. The `try...catch...finally` block runs risky code in `try`, jumps to `catch` if something throws, and always runs `finally` (great for cleanup).

**Analogy:** It's a safety net under a trapeze artist. The `try` is the daring swing, the `catch` is the net that saves you if you fall, and the `finally` is the staff who clean up and reset the stage no matter what happened.

```javascript
try {
  let user = null;
  console.log(user.name); // ❌ TypeError: Cannot read properties of null
} catch (error) {
  console.error("An error occurred:", error.message);
} finally {
  console.log("This always runs.");
}
```

You can also create and `throw` your own errors:

```javascript
function getAge(age) {
  if (age < 0) throw new Error("Age cannot be negative");
  return age;
}

try {
  getAge(-5);
} catch (e) {
  console.error(e.message); // "Age cannot be negative"
}
```

> **Deeper note:** Not everything you'd expect actually throws. `1 / 0` returns `Infinity` and `"abc" * 2` returns `NaN` — neither is an error, so `catch` won't run. Real exceptions come from reading a property of `null`/`undefined`, calling a non-function, or `JSON.parse` on bad text. For **async** code, a plain `try/catch` only catches `await`ed promises — a rejected promise without `await` needs `.catch()`. Throw `Error` objects (not strings) so you get a stack trace, and consider custom error classes (`class ValidationError extends Error`).

---

## 11. Scope and Closures

**Scope** is where a variable is visible: global, function, or block (`{ }`). A **closure** is a function that remembers the variables from where it was created, even after that outer function has finished.

**Analogy:** A closure is like a backpack. When a function is created inside another, it packs a backpack with the variables it needs from its surroundings. Wherever you carry that function later, it still has its backpack — it can reach in and use those variables long after the outer function is gone.

```javascript
function outerFunction() {
  let outerVar = "I'm an outer variable";
  function innerFunction() {
    console.log(outerVar); // still reachable via the "backpack"
  }
  return innerFunction;
}

const closure = outerFunction();
closure(); // "I'm an outer variable"
```

> **Deeper note:** Closures are the foundation of data privacy, function factories, memoization, and the `var`-in-a-loop trap. They retain references to *variables*, not copies of values — so two closures over the same variable see the same updates. Holding large objects in a long-lived closure is a common **memory leak**. Closures and the scope chain are explored in depth on the Intermediate page.

---

## 12. Asynchronous JavaScript

JavaScript is **single-threaded** — it does one thing at a time. Asynchronous code lets slow tasks (network, timers) run in the background so the page never freezes. Three generations: callbacks, promises, and `async/await`.

**Analogy:** Imagine a restaurant with one waiter (the single thread). When you order food that takes time to cook, the waiter doesn't stand frozen at your table until it's ready — they take other orders and come back when the kitchen rings the bell. A **promise** is the buzzer the restaurant hands you: it will light up when your order is ready (resolved) or tell you it's unavailable (rejected).

```javascript
// Callback
function fetchData(callback) {
  setTimeout(() => callback("Data fetched"), 1000);
}
fetchData((data) => console.log(data)); // "Data fetched" after 1s

// Promise
function fetchPromise() {
  return new Promise((resolve) => setTimeout(() => resolve("Data fetched"), 1000));
}
fetchPromise().then((data) => console.log(data));

// async / await (cleanest)
async function getData() {
  try {
    const data = await fetchPromise();
    console.log(data);
  } catch (error) {
    console.error("Failed:", error);
  }
}
getData();
```

> **Deeper note:** "Asynchronous" doesn't mean "multi-threaded." The single thread offloads timers and network to the **Web APIs**, and the **event loop** brings finished callbacks back when the call stack is empty. **Microtasks** (promise callbacks) run before **macrotasks** (`setTimeout`). `async/await` is syntactic sugar over promises — `await` pauses the function and yields the thread. The event loop is a top interview question, detailed on the Intermediate page.

---

## 13. JSON and APIs

**JSON** (JavaScript Object Notation) is a lightweight text format for exchanging data. **APIs** let programs talk to each other; in the browser, the **Fetch API** requests data from a server.

**Analogy:** JSON is like a flat-pack furniture box — your rich object is disassembled into flat, labeled text so it can be shipped over the internet, then reassembled (parsed) at the other end. `JSON.stringify` packs the box; `JSON.parse` unpacks it.

```javascript
let jsonData = '{"name": "John", "age": 30}';

let parsed = JSON.parse(jsonData);     // text → object
console.log(parsed.name);              // "John"

let text = JSON.stringify(parsed);     // object → text
console.log(text);                     // '{"name":"John","age":30}'

// Fetching from a server
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
```

> **Deeper note:** `fetch` returns a promise that only rejects on **network failure** — an HTTP 404 or 500 still *resolves*, so always check `response.ok`. JSON supports only strings, numbers, booleans, `null`, arrays, and objects — `undefined`, functions, and `Date` are dropped or converted by `JSON.stringify`. With `async/await`: `const res = await fetch(url); if (!res.ok) throw new Error(res.status); const data = await res.json();`

---

## 14. ES6 Features

ECMAScript 6 (2015) modernized JavaScript: `let`/`const`, arrow functions, template literals, destructuring, spread/rest, default parameters, and more. These appear in essentially all modern code and interviews.

**Analogy:** ES6 is like upgrading from a flip phone to a smartphone. The old phone still makes calls (old JS still works), but the new features make everyday tasks far faster and cleaner once you learn them.

```javascript
const name = "John", age = 30;

const greet = () => "Hello, World!";              // arrow function

const message = `My name is ${name}, age ${age}.`; // template literal

const person = { name: "Alice", age: 25 };
const { name: personName, age: personAge } = person; // destructuring
console.log(personName, personAge);                  // "Alice" 25
```

> **Deeper note:** The high-frequency ES6+ topics for interviews are destructuring (with defaults and renaming), spread vs rest (same `...` syntax, opposite jobs), template literals (including tagged templates), optional chaining `?.`, nullish coalescing `??`, and ES modules (`import`/`export`). Each is covered with examples on the Intermediate and Advanced pages.

---

## 15. var vs let vs const (and Hoisting)

This is the **most common opening interview question.** Get it right and you start strong.

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block `{ }` | Block `{ }` |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |
| Hoisted | Yes (as `undefined`) | Yes (but in "TDZ") | Yes (but in "TDZ") |

**Hoisting** means JavaScript moves *declarations* to the top of their scope before running the code. With `var`, the variable exists but is `undefined` until its assignment line runs. With `let`/`const`, the variable exists but cannot be touched until its declaration line — that gap is the **Temporal Dead Zone (TDZ)**.

**Analogy:** Hoisting is like a hotel that registers all guest names at check-in before assigning rooms. With `var`, the name is on the list but the room is empty (`undefined`). With `let`/`const`, the name is reserved but you're physically barred from the room (the TDZ) until the official check-in moment.

```javascript
console.log(a); // undefined  (var hoisted and set to undefined)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

**Rule of thumb:** use `const` by default, `let` when you must reassign, and avoid `var`.

> **Deeper note:** `const` prevents *reassignment*, not *mutation* — you can still change the contents of a `const` array or object (`user.name = "Alice"` is fine; `user = {}` is not). Only the **declaration** is hoisted, not the assignment. Function *declarations* are hoisted entirely (callable before they appear); function *expressions* assigned to `var` are `undefined` until the assignment line.

---

## 16. == vs === and Type Coercion

`==` (loose equality) converts types before comparing. `===` (strict equality) checks **value AND type** with no conversion. Always prefer `===`.

**Analogy:** `===` is a strict bouncer checking both your name *and* your ID type — a passport and a driver's license with the same name still aren't the same document. `==` is a lax bouncer who'll squint and say "close enough" — which is exactly how surprising bugs sneak in.

```javascript
console.log(5 == "5");  // true   (string "5" coerced to number 5)
console.log(5 === "5"); // false  (number vs string)

console.log(0 == false);          // true
console.log(null == undefined);   // true
console.log(null === undefined);  // false
```

**Type coercion** is JavaScript auto-converting types. `+` prefers strings; other math operators prefer numbers.

```javascript
console.log("5" + 3);  // "53"  (3 becomes a string, joined)
console.log("5" - 3);  // 2     ("5" becomes a number)
console.log(true + 1); // 2     (true becomes 1)
```

> **Deeper note:** `==` follows the **Abstract Equality** algorithm: `null == undefined` is `true` (and they equal nothing else), `NaN` equals nothing (even itself), and object-vs-primitive comparisons call `valueOf`/`toString`. Infamous results: `[] == ![]` is `true`, `"" == 0` is `true`. The only defensible `==` use is `x == null` to catch both `null` and `undefined` in one check. Otherwise, always `===`.

---

## 17. Primitive vs Reference Types

This explains many "why did my variable change?" bugs.

**Primitives** (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) are copied **by value** — each variable gets its own copy. **Objects** (including arrays and functions) are copied **by reference** — variables point to the same data in memory.

**Analogy:** Copying a primitive is like photocopying a document — you each have your own paper, and marking one doesn't change the other. Copying an object is like sharing a Google Doc link — you both point to the *same* document, so when one person edits it, everyone sees the change.

```javascript
// Primitive: independent copies
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Reference: both point to the same object
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;
console.log(obj1.value); // 20 (changed!)
```

To copy without sharing: `let copy = { ...obj1 }` (shallow) or `structuredClone(obj1)` (deep).

> **Deeper note:** Function arguments are **passed by value** too — but for objects, the "value" passed is the reference. So reassigning a parameter inside a function doesn't affect the caller, but *mutating* the object it points to does. `{ ...obj }` and `Object.assign` are **shallow** — nested objects are still shared. For true independence use `structuredClone` (modern) or a recursive deep clone (Advanced page).

---

## 18. null vs undefined, and Truthy / Falsy

`undefined` means "declared but never given a value" (JavaScript's default). `null` is an intentional "empty" you assign yourself.

**Analogy:** `undefined` is an empty parking spot nobody has used yet. `null` is a spot with a "Reserved — intentionally empty" sign you placed there on purpose. Both are empty, but one is by neglect and the other by decision.

```javascript
let x;        // undefined (JavaScript set this)
let y = null; // null (you chose this)
```

**Falsy values** (treated as `false` in conditions) — exactly 8 worth memorizing: `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN`, and `0n`. **Everything else is truthy** — including `"0"`, `"false"`, `[]`, and `{}`.

```javascript
if ([]) console.log("Empty array is truthy!"); // this runs
if ("") console.log("won't run");              // empty string is falsy
```

> **Deeper note:** This is why `if (arr.length)` works but `if (arr)` is always true for any array. `typeof undefined` is `"undefined"`; `typeof null` is `"object"`. To default only on `null`/`undefined` (not on `0` or `""`), use `??` rather than `||`: `count ?? 10` keeps a real `0`, but `count || 10` would wrongly replace it.

---

## 19. Basics Interview Q&A

**Q: What are the data types in JavaScript?**
Seven primitives — `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint` — plus the non-primitive `object` (which includes arrays and functions).

**Q: What is the difference between `null` and `undefined`?**
`undefined` is the default for an uninitialized variable; `null` is a value you assign on purpose to mean "no value." `typeof undefined` is `"undefined"`, but `typeof null` is `"object"` (a long-standing bug).

**Q: Why use `===` instead of `==`?**
`==` does type coercion which leads to surprises (`"" == 0` is `true`). `===` compares value and type, so it's predictable.

**Q: What is hoisting?**
JavaScript moves declarations to the top of their scope before execution. `var` is hoisted as `undefined`; `let`/`const` are hoisted but unusable until declared (the TDZ); function declarations are fully hoisted.

**Q: What is the difference between a parameter and an argument?**
A *parameter* is the placeholder name in a function definition; an *argument* is the actual value you pass when calling it.

**Q: What does `NaN` mean and how do you check for it?**
`NaN` ("Not a Number") is the result of an invalid math operation like `0/0` or `Number("abc")`. Check with `Number.isNaN(x)` — never `x === NaN` (always `false`, because `NaN` is not equal to itself).

**Q: What is the difference between `let`, `const`, and `var`?**
`var` is function-scoped and hoisted as `undefined`; `let` and `const` are block-scoped and live in the TDZ until declared. `const` also blocks reassignment (but not mutation). Default to `const`.

**Q: Is JavaScript single-threaded or multi-threaded?**
Single-threaded — one call stack. It achieves concurrency by offloading slow work to the browser/Node APIs and using the event loop to process their callbacks.

---

## 20. Project Examples (Practice)

The fastest way to lock in these basics is to build small things:

1. **Interactive form validation** — validate email, password strength, and required fields in real time using events and conditionals.
2. **Simple games** — a number-guessing game, tic-tac-toe, or memory match, exercising arrays, functions, DOM, and events together.
3. **To-do list** — add, delete, and mark items done; great practice for arrays, DOM manipulation, and event delegation.
4. **Fetch and display** — pull data from a public API (like a weather or quotes API) and render it; practices promises, `async/await`, and JSON.

Build at least two of these before your interview. Being able to say "I built X and here's how I handled Y" is worth more than reciting definitions.

---

Next: the **Intermediate** page — scope and closures in depth, `this`, `call`/`apply`/`bind`, higher-order functions, prototypes, the event loop, and the questions interviewers ask most.

<!-- <div style="text-align: right;">by Abhishek Kumar</div> -->
