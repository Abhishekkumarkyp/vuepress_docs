---
title: DSA Practice in JavaScript
---

# DSA Practice Questions in JavaScript

A curated set of classic DSA problems solved **in JavaScript**, grouped by difficulty so beginners, intermediate developers, and advanced/senior candidates can each do a quick self-review. Every solution is chosen not just for the algorithm, but to exercise a different corner of the language — hash maps via plain objects, `Map`/`Set`, closures, higher-order functions, classes, recursion, generators, and promises — so working through all three sections doubles as a JavaScript refresher, not just an algorithms one.

How to use this page: read the problem, try to solve it yourself first, then compare against the solution and read the **JS concepts** line to see what language feature the problem is designed to reinforce.

---

## Beginner

### 1. Two Sum

Given an array of numbers and a target, return the indices of the two numbers that add up to the target.

**Approach:** Walk the array once, and for each number check whether its complement (`target - num`) was already seen. A plain object (or `Map`) gives O(1) lookups, turning an O(n²) brute force into O(n).

```javascript
function twoSum(nums, target) {
  const seen = {}; // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in seen) return [seen[complement], i];
    seen[nums[i]] = i;
  }
  return [];
}

twoSum([2, 7, 11, 15], 9); // [0, 1]
```

**Complexity:** O(n) time, O(n) space.
**JS concepts:** object-as-hash-map, the `in` operator.

---

### 2. Reverse a String

Reverse a string without using `.reverse()` directly on the whole thing (interviewers often ask for the manual version).

**Approach:** Two pointers moving toward each other, swapping characters via an array (strings are immutable in JS, so you can't swap in place on the string itself).

```javascript
function reverseString(str) {
  const chars = str.split("");
  let left = 0, right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]]; // swap
    left++;
    right--;
  }
  return chars.join("");
}

reverseString("hello"); // "olleh"
```

**Complexity:** O(n) time, O(n) space.
**JS concepts:** string immutability, array destructuring swap, two pointers.

---

### 3. Valid Palindrome

Check if a string reads the same forwards and backwards, ignoring case and non-alphanumeric characters.

**Approach:** Normalize with a regex, then two pointers from both ends.

```javascript
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

isPalindrome("A man, a plan, a canal: Panama"); // true
```

**Complexity:** O(n) time, O(n) space (for the cleaned copy).
**JS concepts:** regex (`replace` with a character class), method chaining, two pointers.

---

### 4. FizzBuzz

Print numbers 1 to n, but "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both.

**Approach:** The classic — build the string piece by piece instead of chained `if/else` so it stays readable.

```javascript
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    result.push(out || String(i));
  }
  return result;
}

fizzBuzz(15);
// ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

**Complexity:** O(n) time, O(n) space.
**JS concepts:** modulo operator, truthy/falsy fallback (`out || String(i)`).

---

### 5. Count Character Frequency

Given a string, count how many times each character appears.

**Approach:** A `Map` (or object) as a frequency counter, incrementing on each pass.

```javascript
function charFrequency(str) {
  const freq = new Map();
  for (const ch of str) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }
  return freq;
}

charFrequency("banana");
// Map { 'b' => 1, 'a' => 3, 'n' => 2 }
```

**Complexity:** O(n) time, O(k) space (k = distinct characters).
**JS concepts:** `Map` vs plain object, `for...of` over a string, `.get`/`.set`.

---

### 6. Sum and Average with `reduce`

Given an array of numbers, compute the sum and average without a manual loop.

**Approach:** `reduce` folds the array down to a single accumulated value — the textbook use case.

```javascript
function sumAndAverage(nums) {
  const sum = nums.reduce((total, n) => total + n, 0);
  const average = nums.length ? sum / nums.length : 0;
  return { sum, average };
}

sumAndAverage([2, 4, 6, 8]); // { sum: 20, average: 5 }
```

**Complexity:** O(n) time, O(1) space.
**JS concepts:** `Array.prototype.reduce`, object shorthand return.

---

## Intermediate

### 1. Group Anagrams

Given an array of strings, group the ones that are anagrams of each other.

**Approach:** Anagrams share the same letters sorted — use the sorted string as a `Map` key and bucket words under it.

```javascript
function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = word.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

**Complexity:** O(n · k log k) time (k = average word length), O(n) space.
**JS concepts:** `Map` with a computed key, `sort`, spreading a `Map`'s values into an array.

---

### 2. Flatten a Nested Array

Flatten an arbitrarily nested array into a single flat array — without using the built-in `Array.prototype.flat(Infinity)`.

**Approach:** Recursion — for each item, if it's an array, recurse and spread the result in; otherwise keep it.

```javascript
function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

flatten([1, [2, 3, [4, [5, 6]], 7]]); // [1, 2, 3, 4, 5, 6, 7]
```

**Complexity:** O(n) time where n is the total number of elements, O(depth) recursion stack.
**JS concepts:** recursion, `Array.isArray`, `reduce` + `concat`.

---

### 3. First Non-Repeating Character

Find the first character in a string that doesn't repeat.

**Approach:** Two passes — first build a frequency map, then scan in order and return the first character with count 1.

```javascript
function firstUniqueChar(str) {
  const freq = new Map();
  for (const ch of str) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (const ch of str) if (freq.get(ch) === 1) return ch;
  return null;
}

firstUniqueChar("swiss"); // "w"
```

**Complexity:** O(n) time, O(k) space.
**JS concepts:** `Map` preserves insertion order (unlike plain object keys, which sort numeric-like keys first — see the Traps page), two-pass scanning.

---

### 4. Debounce a Function

Build `debounce(fn, delay)` so `fn` only runs once activity *stops* for `delay` ms — the classic search-box optimization, and a very common "write it live" ask.

**Approach:** A closure holds the timer id across calls; each new call cancels the pending one and reschedules.

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const logSearch = debounce((query) => console.log("Searching:", query), 300);
logSearch("a");
logSearch("ap");
logSearch("app"); // only this call actually runs, 300ms after the last keystroke
```

**Complexity:** O(1) per call.
**JS concepts:** closures, `setTimeout`/`clearTimeout`, rest parameters, `.apply` to preserve `this`.

---

### 5. Memoized Fibonacci

Compute the nth Fibonacci number efficiently by caching results of prior calls.

**Approach:** Plain recursive Fibonacci is exponential because it recomputes the same subproblems repeatedly. A closure-held cache turns it into linear time — a small, self-contained example of dynamic programming.

```javascript
function memoizedFib() {
  const cache = new Map([[0, 0], [1, 1]]);
  function fib(n) {
    if (cache.has(n)) return cache.get(n);
    const result = fib(n - 1) + fib(n - 2);
    cache.set(n, result);
    return result;
  }
  return fib;
}

const fib = memoizedFib();
fib(30); // 832040 — instant, vs. ~2.7 million calls unmemoized
```

**Complexity:** O(n) time, O(n) space — down from O(2ⁿ) for the naive recursive version.
**JS concepts:** closures for a private cache, recursion, memoization.

---

### 6. Implement a Stack and a Queue

Build both classic structures using a class wrapped around an array.

**Approach:** A stack is last-in-first-out (`push`/`pop` at the same end); a queue is first-in-first-out (`push` at the back, `shift` from the front).

```javascript
class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop() { return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  get isEmpty() { return this.#items.length === 0; }
}

class Queue {
  #items = [];
  enqueue(item) { this.#items.push(item); }
  dequeue() { return this.#items.shift(); }
  get isEmpty() { return this.#items.length === 0; }
}

const s = new Stack();
s.push(1); s.push(2); s.pop(); // 2

const q = new Queue();
q.enqueue(1); q.enqueue(2); q.dequeue(); // 1
```

**Complexity:** O(1) for stack `push`/`pop`; O(n) for `Queue#dequeue` (array `shift` re-indexes) — mention this trade-off, and that a real production queue uses a linked list or two-stack design for O(1) dequeue.
**JS concepts:** classes, private fields (`#items`), getters, `Array.prototype.at`.

---

## Advanced

### 1. LRU Cache

Implement a Least Recently Used cache with `get(key)` and `put(key, value)`, evicting the oldest-used entry when capacity is exceeded.

**Approach:** A JavaScript `Map` remembers **insertion order**, which is exactly the property an LRU cache needs. On `get`, delete and re-insert the key to mark it "recently used"; on overflow, delete the first key in iteration order (the least recently used one).

```javascript
class LRUCache {
  #capacity;
  #cache = new Map();

  constructor(capacity) {
    this.#capacity = capacity;
  }

  get(key) {
    if (!this.#cache.has(key)) return -1;
    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value); // move to "most recently used" (end)
    return value;
  }

  put(key, value) {
    if (this.#cache.has(key)) this.#cache.delete(key);
    else if (this.#cache.size >= this.#capacity) {
      const oldest = this.#cache.keys().next().value; // first key = least recently used
      this.#cache.delete(oldest);
    }
    this.#cache.set(key, value);
  }
}

const lru = new LRUCache(2);
lru.put(1, "a");
lru.put(2, "b");
lru.get(1);        // "a" (1 is now most recently used)
lru.put(3, "c");   // evicts 2 (the least recently used)
lru.get(2);        // -1
```

**Complexity:** O(1) for both `get` and `put`.
**JS concepts:** `Map` insertion-order guarantee, private class fields, `Map#keys()` iterator.

---

### 2. Detect a Cycle in a Linked List

Given a singly linked list, determine whether it contains a cycle — without extra memory proportional to the list.

**Approach:** Floyd's Tortoise and Hare — two pointers moving at different speeds. If there's a cycle, the faster one eventually laps the slower one; if not, it reaches `null` first.

```javascript
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // they met — there's a cycle
  }
  return false;
}
```

**Complexity:** O(n) time, O(1) space.
**JS concepts:** classes for node structures, reference equality (`slow === fast` compares object identity, not contents), the fast/slow-pointer pattern.

---

### 3. Deep Clone with Circular References

Write a deep clone that also survives an object referencing itself (which `JSON.parse(JSON.stringify(x))` cannot handle).

**Approach:** Recursive clone, tracking already-cloned objects in a `WeakMap` so a repeated (or circular) reference reuses the existing clone instead of recursing forever.

```javascript
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (seen.has(obj)) return seen.get(obj); // already cloned — break the cycle

  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);

  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}

const a = { name: "node-a" };
a.self = a; // circular reference
const cloned = deepClone(a);
cloned.self === cloned; // true — the clone is circular too, and it didn't infinite-loop
```

**Complexity:** O(n) time and space (n = total keys/values visited).
**JS concepts:** `WeakMap` (garbage-collectable cache keyed by object identity), recursion, `Object.keys`.

---

### 4. Polyfill `Promise.all`

Implement `Promise.all` from scratch: resolve with an array of all results (in original order) once every promise settles, or reject as soon as any one rejects.

**Approach:** Track a completed count and write each result into its original index (not `push`, since promises can finish out of order) — resolve once every slot is filled.

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = value;       // preserve original order
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);             // short-circuit on first rejection
    });
  });
}

promiseAll([
  Promise.resolve(1),
  new Promise((res) => setTimeout(() => res(2), 100)),
  3, // non-promise values are allowed too
]).then(console.log); // [1, 2, 3]
```

**Complexity:** O(n) — one `.then`/`.catch` per input promise.
**JS concepts:** the `Promise` constructor (executor pattern), `Promise.resolve` to normalize non-promise values, closures capturing `results`/`completed`, index-based writes to avoid ordering bugs.

---

### 5. Curry a Function

Transform a fixed-arity function into a chain of single-argument calls: `curry(add)(1)(2)(3)`.

**Approach:** Keep collecting arguments in a closure until enough have arrived (compared against `fn.length`, the function's declared parameter count), then invoke.

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...next) => curried(...args, ...next);
  };
}

const add3 = (a, b, c) => a + b + c;
const curried = curry(add3);

curried(1)(2)(3); // 6
curried(1, 2)(3); // 6
curried(1)(2, 3); // 6
```

**Complexity:** O(1) per call layer (calls scale with argument count, not input size).
**JS concepts:** closures, rest/spread, `Function.prototype.length`, recursion.

---

### 6. Lazy Fibonacci Sequence with a Generator

Produce Fibonacci numbers one at a time, on demand, without precomputing or storing the whole (potentially infinite) sequence.

**Approach:** A generator function pauses at each `yield` and only computes the next value when `.next()` is called — ideal for lazy/infinite sequences.

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const gen = fibonacci();
const firstTen = [];
for (let i = 0; i < 10; i++) firstTen.push(gen.next().value);

firstTen; // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Or pull only what you need, lazily, with a take() helper:
function take(iterator, n) {
  return Array.from({ length: n }, () => iterator.next().value);
}
take(fibonacci(), 5); // [0, 1, 1, 2, 3]
```

**Complexity:** O(1) per value produced, O(1) memory regardless of how many values are pulled.
**JS concepts:** `function*`/`yield`, generators as lazy iterators, array destructuring swap, `Array.from` with a length + mapper.

---

## Where to Go Next

- Struggled with the **Beginner** set? Revisit [JavaScript Basics](./README.md) — sections 3, 6, and 7 cover variables, functions, and arrays/objects in depth.
- Struggled with **Intermediate**? Revisit [Intermediate JavaScript](./intermediate.md) — closures, higher-order functions, and `this` are covered there in full.
- Struggled with **Advanced**? Revisit [Advanced JavaScript](./advance.md) — currying, memoization, generators, and polyfills each get a dedicated section.
- For more algorithm-only practice (outside the JavaScript-feature framing here), see the [DSA section](../dsa/README.md).
