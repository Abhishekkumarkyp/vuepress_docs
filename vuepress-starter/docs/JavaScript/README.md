---
title: Introduction to JavaScript
---

## 1. **What is JavaScript**

JavaScript is a high-level, interpreted programming language primarily used for web development. It enables dynamic, interactive content on web pages. JavaScript can interact with HTML and CSS to manipulate webpage elements, respond to user actions, and handle data.

**Example:**

```javascript
// Display a simple alert message
alert("Welcome to JavaScript!");
```

## 2. **Setup & Environment**

To start coding in JavaScript, you need a text editor and a web browser. Popular text editors include Visual Studio Code, Sublime Text, and Atom. Once you've chosen an editor, create a new file with a .js extension (e.g., script.js) to write your JavaScript code. For testing, open the HTML file containing your JavaScript in a web browser.

**Example:**

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

## 3. **Variables & Data Types**

Variables are containers for storing data values. In JavaScript, you can declare variables using the `var`, `let`, or `const` keywords. JavaScript supports various data types such as strings, numbers, booleans, arrays, objects, and more.

**Example:**

```javascript
// Declare variables
let name = "John";
const age = 30;
var isStudent = true;

// Display data types
console.log(typeof name); // Output: string
console.log(typeof age); // Output: number
console.log(typeof isStudent); // Output: boolean

```

## 4. **Operators & Expressions**

Operators are symbols used to perform operations on variables and values. JavaScript supports arithmetic, assignment, comparison, logical, and other types of operators. Expressions are combinations of variables, values, and operators that evaluate to a single value.

**Example:**

```javascript
// Arithmetic operators
let x = 10;
let y = 5;
console.log(x + y); // Output: 15
console.log(x - y); // Output: 5
console.log(x * y); // Output: 50
console.log(x / y); // Output: 2

// Comparison operators
console.log(x > y); // Output: true
console.log(x === y); // Output: false

// Logical operators
let p = true;
let q = false;
console.log(p && q); // Output: false
console.log(p || q); // Output: true
```

## 5. **Control Flow & Conditionals**

Control flow statements in JavaScript determine the execution order of code blocks. Conditional statements, like `if`, `else if`, and `else`, allow you to execute different blocks of code based on specified conditions. Loops, such as `for` and `while`, enable repetitive execution of code blocks.

**Example:**

```javascript
// If statement
let time = 12;
if (time < 12) {
    console.log("Good morning!");
} else if (time < 18) {
    console.log("Good afternoon!");
} else {
    console.log("Good evening!");
}

// Loop (for)
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}
```

## 6. Functions

Functions are blocks of code designed to perform a specific task. They allow you to encapsulate a piece of code and reuse it throughout your program. In JavaScript, you can declare functions using the `function` keyword followed by a name and parentheses, which may contain parameters. Functions can also return values using the `return` keyword.

**Example:**

```javascript
// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Function call
console.log(greet("John")); // Output: Hello, John!
```

## 7. Arrays and Objects

Arrays and objects are data structures used to store collections of values in JavaScript. Arrays are ordered lists of values, while objects are collections of key-value pairs. Arrays and objects can contain values of any data type, including other arrays and objects. They also have built-in methods for manipulation and iteration.

**Example:**

```javascript
// Array declaration
let fruits = ["Apple", "Banana", "Orange"];

// Object declaration
let person = {
    name: "John",
    age: 30,
    isStudent: true
};

// Accessing array elements
console.log(fruits[0]); // Output: Apple

// Accessing object properties
console.log(person.name); // Output: John
```

## 8. DOM Manipulation

The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the structure of a document as a tree of nodes, where each node corresponds to an HTML element. DOM manipulation involves accessing, modifying, or deleting HTML elements on a webpage using JavaScript.

```html
<!DOCTYPE html>
<html>
<body>

<h2>DOM Manipulation Example</h2>
<p id="demo">JavaScript can change HTML content.</p>

<script>
// Change text content
document.getElementById("demo").innerHTML = "Hello, World!";
</script>

</body>
</html>
```

## 9. Events

Events are actions or occurrences that happen in the browser, such as a user clicking a button or hovering over an element. JavaScript allows you to handle these events using event listeners. Event listeners wait for specific events to occur and then execute a specified piece of code in response.

```html
<!DOCTYPE html>
<html>
<body>

<button id="myButton">Click me</button>

<script>
// Add event listener
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button clicked!");
});
</script>

</body>
</html>
```

## 10. Error Handling

Error handling is the process of anticipating and responding to errors that occur during the execution of a program. In JavaScript, you can handle errors using try...catch blocks. The try block contains the code that might throw an error, while the catch block handles the error if one occurs.

```javascript
try {
    // Code that might throw an error
    let x = 1 / 0;
} catch (error) {
    // Handle the error
    console.error("An error occurred:", error.message);
}
```

## 11. Scope and Closures

Scope refers to the visibility and accessibility of variables within a JavaScript program. Variables can have global scope, function scope, or block scope, depending on where they are declared. Closures are an important concept related to scope in JavaScript. They allow functions to retain access to variables from their enclosing scope even after the enclosing scope has executed.

**Example:**

```javascript
// Global scope variable
let globalVar = "I'm a global variable";

function outerFunction() {
    // Function scope variable
    let outerVar = "I'm an outer variable";

    function innerFunction() {
        // Inner function accessing outer scope variable
        console.log(outerVar);
    }

    return innerFunction;
}

// Creating closure
let closure = outerFunction();

// Calling closure
closure(); // Output: I'm an outer variable
```

## 12. Asynchronous JavaScript

Asynchronous programming in JavaScript allows you to execute code without blocking the main thread. This is crucial for tasks such as fetching data from servers, reading files, or handling user input. Asynchronous operations are typically handled using `callbacks`, `promises`, or the newer `async/await` syntax.

**Example using Callbacks:**

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data fetched");
    }, 1000);
}

fetchData(data => {
    console.log(data); // Output: Data fetched
});
```

**Example using Promises::**

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 1000);
    });
}

fetchData().then(data => {
    console.log(data); // Output: Data fetched
});
```

**Example using Async/Await:**

```javascript
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 1000);
    });
}

async function getData() {
    const data = await fetchData();
    console.log(data); // Output: Data fetched
}

getData();
```

## 13. JSON and APIs

JSON (JavaScript Object Notation) is a lightweight data-interchange format used to transmit data between a server and a web application. It is easy for humans to read and write and easy for machines to parse and generate. APIs (Application Programming Interfaces) allow applications to communicate with each other. They define the methods and data formats that applications can use to request and exchange information.

**Example:**

```javascript
// Example JSON data
let jsonData = '{"name": "John", "age": 30}';

// Parsing JSON
let parsedData = JSON.parse(jsonData);
console.log(parsedData.name); // Output: John

// Stringifying JSON
let stringifiedData = JSON.stringify(parsedData);
console.log(stringifiedData); // Output: {"name":"John","age":30}
```

Using Fetch API:

```javascript

fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error));
```

## 14. ES6 Features

ECMAScript 6 (ES6) introduced several new features and enhancements to the JavaScript language, making it more expressive and powerful. Some of the key features include let/const for variable declaration, arrow functions for concise syntax, template literals for string interpolation, and destructuring for extracting values from objects and arrays.

**Example:**

```javascript
// Using let and const
let name = "John";
const age = 30;

// Arrow functions
const greet = () => {
    return "Hello, World!";
};

// Template literals
const message = `My name is ${name} and I am ${age} years old.`;

// Destructuring
const person = { name: "Alice", age: 25 };
const { name: personName, age: personAge } = person;
console.log(personName, personAge); // Output: Alice 25
```

## 15. Project Examples

Providing simple project examples is a great way for beginners to practice their JavaScript skills. Below are a couple of project ideas:

1. **Interactive Form Validation:**
   Create a web form that validates user input in real-time. Validate fields such as email, password strength, and required fields using JavaScript.

2. **Simple Games:**
   Develop simple browser-based games using JavaScript. Examples include a guessing game, tic-tac-toe, or a simple memory matching game.

These projects allow beginners to apply their JavaScript knowledge in real-world scenarios and gain hands-on experience.

<!-- <div style="text-align: right;">by Abhishek Kumar</div> -->
