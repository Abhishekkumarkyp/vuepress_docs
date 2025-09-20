# Computer Science & System Design Concepts

Brightly’s technical interview includes data‑structure and algorithm problems, SQL queries, object‑oriented design and high‑level system design.  This document summarises foundational topics to review.

## Data structures & algorithms

* **Arrays and strings** – know common operations (search, insert, remove), sliding‑window patterns and two‑pointer techniques.  Practice problems like reversing an array, checking for palindromes and maximum subarray sum.
* **Linked lists** – operations (insertion, deletion), reversing a linked list, detecting cycles (Floyd’s algorithm) and merging sorted lists.
* **Stacks and queues** – implement using arrays or linked lists.  Use for problems like balanced parentheses, sliding‑window maximums and BFS.
* **Trees and graphs** – traversals (preorder, inorder, postorder), binary search trees, heap operations, breadth‑first and depth‑first search, shortest path algorithms (Dijkstra).  Understand tree/graph representations (adjacency list/matrix) and complexity.
* **Hash maps & sets** – use for constant‑time lookups and to track frequency or membership.  Be aware of collision handling and when to choose ordered maps (`Map`, `Set`) vs. plain objects.

Master time and space complexity analysis (Big‑O notation) and practise on platforms like LeetCode or HackerRank.  Round 1 of the ASE interview included coding problems involving dynamic arrays and a variant of the maximum subarray sum【243991521335833†L59-L63】.

## SQL & database basics

Round 2 included questions about SQL queries and database design【243991521335833†L70-L83】.  Review the following:

* **SELECT queries** – filtering (`WHERE`), sorting (`ORDER BY`), limiting (`LIMIT`/`OFFSET`) and selecting unique values (`DISTINCT`).
* **Aggregation** – functions such as `COUNT`, `SUM`, `AVG`, `MIN` and `MAX` combined with `GROUP BY`.  Understand `HAVING` versus `WHERE` for filtering aggregated data.
* **Joins** – inner, left, right and full joins.  Know when to use each and how to join tables on foreign keys.
* **Normalization** – concepts of first, second and third normal forms to reduce redundancy【243991521335833†L70-L83】.  Practise designing schemas for simple scenarios (e.g., students and courses) and writing queries to find duplicates or second‑highest values.

## Object‑oriented programming & SOLID

Interviewers will test your understanding of OOP principles:

* **Encapsulation, inheritance, polymorphism and abstraction** – be able to explain each and give examples.  For example, use inheritance to derive specialised classes from a base `Asset` class and override methods.
* **SOLID principles** – Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation and Dependency Inversion.  In practise, these guide how to split large components into smaller, testable units and how to depend on abstractions rather than concrete implementations.
* **Design patterns** – know when to apply patterns such as Factory (creating objects), Strategy (interchangeable algorithms), Observer (event subscription) and Adapter (translating interfaces).  Demonstrate how these patterns can reduce coupling.

## System design fundamentals

The development round for the ASE role involved designing a system to handle and retrieve user data efficiently【243991521335833†L94-L97】.  At a high level:

* **Clarify requirements** – number of users, read/write ratio, latency targets, consistency requirements and expected growth.  Identify core operations (e.g., create user, update user, query by roll number/class).
* **Data modelling** – choose appropriate data stores.  For relational data with ad‑hoc queries, a SQL database works well.  For high‑throughput or flexible schemas, consider a NoSQL store like MongoDB.
* **Indexing** – create indexes on frequently queried fields (e.g., roll number, class) to optimise lookups.  Understand the trade‑off between read performance and write overhead.
* **Caching** – use an in‑memory cache (e.g., Redis) for hot queries.  Implement cache invalidation strategies.
* **API & service layer** – design a REST or gRPC API.  Use pagination and filtering to limit data transfer.  Consider microservices if the domain is large (e.g., separate user service from asset service).
* **Scalability & reliability** – discuss horizontal scaling (adding more instances), load balancers, replication and failover.  Incorporate monitoring and logging to detect issues.

Practising system design problems (e.g., designing a social network’s news feed, an e‑commerce inventory system) will prepare you to decompose requirements and reason about architecture under constraints.