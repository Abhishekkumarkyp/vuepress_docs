# Comparison: Divide and Conquer vs Dynamic Programming vs Greedy Algorithm

| **Aspect**                         | **Divide and Conquer**                                                                                      | **Dynamic Programming**                                                                                     | **Greedy Algorithm**                                                                                     |
|------------------------------------|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **1. Approach Type**               | **Top-Down** approach.                                                                                      | **Bottom-Up** approach (typically), but can also use **Top-Down** (with memoization).                       | **Top-Down** approach.                                                                                   |
| **2. Problem Type**                | Used for **decision problems** and problems that can be broken into smaller, independent subproblems.       | Solves **optimization problems** with overlapping subproblems.                                             | Solves **optimization problems** where local choices lead to global optimal solutions.                   |
| **3. Computation Reuse**           | **Recomputes subproblems** if they overlap, leading to inefficiency.                                        | Stores subproblem solutions in a table to **reuse** them later (avoids redundant calculations).            | Does **not revisit previously computed solutions**, avoiding re-computation entirely.                   |
| **4. Optimality**                  | Does not aim for optimal solutions but provides correct solutions for the given problem.                    | Always generates an **optimal solution**, provided the problem has **optimal substructure**.               | May or may not generate an **optimal solution** (depends on the problem satisfying the greedy property). |
| **5. Execution Nature**            | **Recursive**: Solves problems by dividing them into subproblems and combining solutions.                   | **Recursive** (Top-Down with memoization) or **Iterative** (Bottom-Up).                                    | **Iterative**: Makes decisions step-by-step in a sequential manner.                                      |
| **6. Efficiency**                  | - Less efficient for overlapping subproblems (e.g., Divide and Conquer may take exponential time).           | - Efficient but slower than Greedy (e.g., Bellman-Ford algorithm for shortest paths takes \(O(VE)\)).      | - Fast and efficient for suitable problems (e.g., Dijkstra’s algorithm takes \(O(E \log V)\)).           |
| **7. Memory Requirements**         | Requires **some memory** (recursion stack for function calls).                                              | Requires **more memory** (tables or arrays to store subproblem results).                                   | Requires **minimal memory** (no storage for subproblem results).                                        |
| **8. Examples**                    | - **Merge Sort**: Divides the array, sorts halves recursively, and merges them.                              | - **0/1 Knapsack**: Solves for each capacity, storing intermediate results for reuse.                      | - **Fractional Knapsack**: Selects items by highest value-to-weight ratio.                               |
|                                    | - **Quick Sort**: Divides array based on pivot, then sorts partitions.                                       | - **All-Pairs Shortest Path (Floyd-Warshall)**: Reuses smaller path results to build optimal paths.         | - **Activity Selection**: Chooses earliest finishing activities.                                         |
|                                    | - **Strassen’s Matrix Multiplication**: Divides matrix into smaller ones recursively.                       | - **Matrix Chain Multiplication**: Finds optimal parenthesization using stored results.                    | - **Job Sequencing**: Schedules jobs for maximum profit.                                                 |



# Control Mechanisms in Programming

Control mechanisms are essential constructs in programming that determine the flow of execution within a program. The three main control mechanisms are **Sequencing**, **Selection**, and **Iteration**. Below is a brief explanation of each:

## 1. Sequencing
Sequencing ensures that statements execute in the order they are written, from top to bottom.

### Example:
```python
x = 5
y = x + 2
print(y)
```
**Output:**
```
7
```
Here, the program assigns `5` to `x`, computes `y` as `x + 2`, and then prints `y`.

## 2. Selection
Selection involves conditional execution of code based on specific conditions. It allows decision-making in programs.

### Example:
```python
x = 3
if x > 0:
    print("Positive")
else:
    print("Non-positive")
```
**Output:**
```
Positive
```
The program checks if `x` is greater than `0` and prints "Positive"; otherwise, it prints "Non-positive".

## 3. Iteration
Iteration allows a block of code to execute repeatedly until a condition is met.

### Example:
```python
for i in range(1, 6):
    print(i)
```
**Output:**
```
1
2
3
4
5
```
This loop iterates from `1` to `5`, printing each number.

## Conclusion
Control mechanisms like sequencing, selection, and iteration are fundamental for building logical and efficient programs.

