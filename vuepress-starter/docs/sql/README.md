# Top 50 Questions of DBMS 

### 1. What is a database management system (DBMS)?

A **Database Management System (DBMS)** is software that manages databases and allows users to store, retrieve, and manipulate data. It provides an interface between the user and the database, ensuring data consistency, integrity, and security.

Example: MySQL, PostgreSQL, Oracle, and SQL Server are popular DBMS.

### 2. What is the difference between a database and a DBMS?

 - **Database**: A database is a collection of data that is organized in tables. It stores the actual data.
- **DBMS**: A DBMS is the software that manages and controls access to the data in the database.

Example: Think of the database as a file cabinet (storing data), and the DBMS as the librarian (managing access and retrieval).

### 3. What are the different types of databases?

Different types of databases include:
1. **Relational Databases**: Store data in tables with rows and columns (e.g., MySQL, PostgreSQL).
2. **NoSQL Databases**: Handle unstructured data (e.g., MongoDB, Cassandra).
3. **Graph Databases**: Store data as graphs, useful for relationships (e.g., Neo4j).
4. **Object-oriented Databases**: Store data as objects, similar to how data is represented in object-oriented programming (e.g., ObjectDB).

### 4. What is a relational database?

A **relational database** stores data in structured tables. Each table consists of rows (records) and columns (attributes). These tables can be linked to each other using keys, such as **primary keys** and **foreign keys**.

Example: In a relational database, you might have a `Customers` table and an `Orders` table, and each customer in the `Customers` table can have multiple orders in the `Orders` table.

### 5. What is SQL, and what is it used for?

**SQL (Structured Query Language)** is a programming language used to interact with relational databases. It allows users to query, update, insert, and delete data in the database.

Example:
```sql
SELECT * FROM customers; -- This retrieves all data from the customers table.
```

### 6. What are the different types of SQL statements?

SQL statements are categorized as:
1. **DDL (Data Definition Language)**: Defines the structure of a database (e.g., `CREATE`, `ALTER`, `DROP`).
2. **DML (Data Manipulation Language)**: Manages data within schema (e.g., `SELECT`, `INSERT`, `UPDATE`, `DELETE`).
3. **DCL (Data Control Language)**: Controls access to data (e.g., `GRANT`, `REVOKE`).
4. **TCL (Transaction Control Language)**: Manages transactions (e.g., `COMMIT`, `ROLLBACK`).

### 7. What is the difference between DDL, DML, and DCL commands?

- **DDL**: Defines or modifies database structures (e.g., `CREATE TABLE`).
- **DML**: Works with data in the tables (e.g., `SELECT`, `INSERT`).
- **DCL**: Controls access permissions (e.g., `GRANT`, `REVOKE`).

Example:
 - **DDL**: `CREATE TABLE Customers (customer_id INT, customer_name VARCHAR(100));`
 - **DML**: `SELECT * FROM Customers;`
 - **DCL**: `GRANT SELECT ON Customers TO user;`

### 8. What is a primary key?

A **primary key** is a unique identifier for a record in a table. It ensures that each row in the table is unique and cannot be `NULL`.

Example:
```sql
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);
```

### 9. What is a foreign key?

A **foreign key** is a field in a table that creates a relationship with the primary key in another table. It helps maintain data integrity by ensuring that a record in one table is linked to a record in another table.

Example:
```sql
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```

### 10. What is a unique key?

A **unique key** ensures that all values in a column are distinct. Unlike the primary key, it allows `NULL` values.

Example:
```sql
CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE
);
```

### 11. What is a composite key?

A **composite key** is a combination of two or more columns used to uniquely identify a record in a table.

Example:
```sql
CREATE TABLE OrderDetails (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

### 12. What is a surrogate key?

A **surrogate key** is a unique identifier for a record, typically an auto-incremented number, used instead of natural keys like email or phone numbers.

Example: Using an `employee_id` as an auto-increment integer instead of using the employee's name or email.

### 13. What is normalization, and why is it important?

**Normalization** is the process of organizing data to reduce redundancy and dependency. It involves dividing large tables into smaller ones and linking them using keys. It ensures data consistency and avoids duplication.

Example: Instead of storing an employee's address in every record, you store it in a separate `Addresses` table and link it to the `Employees` table using a foreign key.

### 14. Explain the different normal forms (1NF, 2NF, 3NF, BCNF).

 - **1NF (First Normal Form)**: Ensures that each column contains atomic (indivisible) values and that each record is unique.
- **2NF (Second Normal Form)**: Achieved by removing partial dependencies; non-key attributes must depend on the entire primary key.
- **3NF (Third Normal Form)**: Achieved by removing transitive dependencies; non-key attributes should not depend on other non-key attributes.
- **BCNF (Boyce-Codd Normal Form)**: A stricter version of 3NF, where every determinant is a candidate key.

### 15. What is denormalization, and when is it used?

**Denormalization** is the process of combining tables to reduce the complexity of queries and improve read performance, at the cost of increasing redundancy. It is used in cases where read performance is more important than storage efficiency.

Example: Merging `Customers` and `Orders` tables into one for faster queries.

### 16. What is an index, and how does it improve query performance?

An **index** is a database object that improves the speed of data retrieval operations. It works similarly to a book index, allowing quick lookups.

Example:
```sql
CREATE INDEX idx_customer_name ON Customers(customer_name);
```

### 17. What are the different types of indexes in SQL?

The common types of indexes include:
1. **Unique Index**: Ensures all values in a column are unique.
2. **Composite Index**: Involves multiple columns.
3. **Clustered Index**: Data rows are stored in the index order.
4. **Non-clustered Index**: Data rows are stored separately from the index.
5. **Full-text Index**: Used for full-text search.

### 18. What is a view in SQL?

A **view** is a virtual table created by querying data from one or more tables. It doesn’t store data but provides a simplified or customized view of the data.

Example:
```sql
CREATE VIEW CustomerOrders AS
SELECT Customers.customer_name, Orders.order_date
FROM Customers
JOIN Orders ON Customers.customer_id = Orders.customer_id;
```

### 19. What is a stored procedure in SQL, and how does it work?

A **stored procedure** is a precompiled collection of SQL statements that can be executed as a single unit. It allows for reusable code and can accept parameters.

Example:
```sql
CREATE PROCEDURE GetCustomerOrders (IN customer_id INT)
BEGIN
    SELECT * FROM Orders WHERE customer_id = customer_id;
END;
```

### 20. What is a transaction in SQL, and how does it work?

A **transaction** is a sequence of SQL operations that are executed as a single unit. If any operation fails, the entire transaction is rolled back to ensure data consistency.

Example:
```sql
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

### 21. What are the ACID properties of a transaction?

The **ACID** properties ensure that database transactions are processed reliably:
1. **Atomicity**: All operations in a transaction are completed or none at all.
2. **Consistency**: Ensures the database is in a valid state before and after the transaction.
3. **Isolation**: Transactions are isolated from each other until completed.
4. **Durability**: Once a transaction is committed, its effects are permanent.

Example: If a bank transfers money from one account to another, and the transaction fails after the first operation, the database is rolled back to ensure no funds were transferred.

### 22. What is the difference between commit and rollback in SQL?

 - **Commit**: The `COMMIT` command is used to save the changes made by a transaction permanently in the database.
- **Rollback**: The `ROLLBACK` command is used to undo changes made during the transaction, reverting the database to its state before the transaction started.

Example:
```sql
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;  -- Commits the transaction and makes changes permanent
```

### 23. What is a join in SQL?

A **join** is a SQL operation that combines rows from two or more tables based on a related column between them. Joins are used to extract meaningful data by linking tables together.

Example:
```sql
SELECT Customers.customer_name, Orders.order_date
FROM Customers
JOIN Orders ON Customers.customer_id = Orders.customer_id;
```

### 24. Explain the different types of joins (inner join, left join, right join, full outer join).

 - **Inner Join**: Returns only the rows where there is a match in both tables.
- **Left Join**: Returns all rows from the left table, and the matched rows from the right table. If there is no match, `NULL` values are returned for columns from the right table.
- **Right Join**: Similar to the left join, but returns all rows from the right table, and matched rows from the left table.
- **Full Outer Join**: Returns all rows from both tables. If there is no match, `NULL` values are returned for columns from the table without a match.

Example:
```sql
SELECT * FROM A
LEFT JOIN B ON A.id = B.id;
```

### 25. What is a self-join?

A **self-join** is when a table is joined with itself. This is useful when you need to compare rows within the same table.

Example:
```sql
SELECT A.employee_id, A.manager_id, B.employee_id AS manager_id
FROM employees A
JOIN employees B ON A.manager_id = B.employee_id;
```

### 26. What is a cross-join?

A **cross join** returns the Cartesian product of two tables, meaning it returns every combination of rows from the two tables.

Example:
```sql
SELECT * FROM employees
CROSS JOIN departments;
```

### 27. What is a subquery in SQL?

A **subquery** is a query nested inside another query. It can be used in `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statements to perform operations based on the results of another query.

Example:
```sql
SELECT * FROM employees
WHERE employee_id IN (SELECT employee_id FROM orders WHERE order_date > '2024-01-01');
```

### 28. What is the difference between a correlated and a non-correlated subquery?

- **Correlated Subquery**: A subquery that depends on the outer query. It is executed once for each row processed by the outer query.
- **Non-correlated Subquery**: A subquery that does not depend on the outer query and can be executed independently.

Example:
 - **Correlated Subquery**:
   ```sql
   SELECT employee_id
   FROM employees e
   WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id);
   ```
 - **Non-correlated Subquery**:
   ```sql
   SELECT employee_id FROM employees WHERE department_id = 1;
   ```

### 29. What is a union in SQL, and how does it work?

The **UNION** operator combines the results of two or more `SELECT` queries into a single result set. It removes duplicate rows by default.

Example:
```sql
SELECT customer_name FROM customers
UNION
SELECT supplier_name FROM suppliers;
```

### 30. What is the difference between union and union all?

- **Union**: Combines the results of two queries and removes duplicate rows.
- **Union All**: Combines the results of two queries but does **not** remove duplicates.

Example:
```sql
SELECT customer_name FROM customers
UNION ALL
SELECT supplier_name FROM suppliers;
```

### 31. What is an aggregate function in SQL?

An **aggregate function** performs a calculation on a set of values and returns a single result. Common aggregate functions include `COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()`.

Example:
```sql
SELECT COUNT(*) FROM employees;
```

### 32. What are the different types of aggregate functions?

1. **COUNT()**: Returns the number of rows.
2. **SUM()**: Returns the sum of a numeric column.
3. **AVG()**: Returns the average value of a numeric column.
4. **MIN()**: Returns the minimum value in a column.
5. **MAX()**: Returns the maximum value in a column.

### 33. What is the difference between WHERE and HAVING clauses?

 - **WHERE**: Filters records before any grouping (used with `SELECT`, `UPDATE`, `DELETE`).
- **HAVING**: Filters records after the grouping, and is used in conjunction with `GROUP BY`.

Example:
```sql
SELECT department_id, COUNT(*) 
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;
```

### 34. What is the difference between DISTINCT and UNIQUE in SQL?

 - **DISTINCT**: Eliminates duplicate rows in the result set.
- **UNIQUE**: Ensures that all values in a column are unique, typically used as a constraint.

Example:
```sql
SELECT DISTINCT city FROM customers;
```

### 35. What is a cursor in SQL, and how is it used?

A **cursor** is a database object used to retrieve and manipulate rows of a result set one at a time. It’s useful when you need to process each row individually.

Example:
```sql
DECLARE cursor_name CURSOR FOR
SELECT employee_id FROM employees;
OPEN cursor_name;
FETCH NEXT FROM cursor_name INTO @employee_id;
```

### 36. What is a temporary table in SQL?

A **temporary table** is a table that exists temporarily during a session or a query. It is automatically dropped when the session ends or the connection is closed.

Example:
```sql
CREATE TEMPORARY TABLE temp_orders AS SELECT * FROM orders WHERE order_date = '2024-01-01';
```

### 37. What is the difference between TRUNCATE and DELETE commands?

 - **TRUNCATE**: Removes all rows from a table without logging individual row deletions. It is faster but cannot be rolled back.
- **DELETE**: Removes rows based on a condition and is slower than `TRUNCATE`. It can be rolled back.

### 38. What is a constraint in SQL?

A **constraint** is a rule applied to columns in a table to enforce data integrity. Common constraints include `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, and `CHECK`.

Example:
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE
);
```

### 39. What are the different types of constraints in SQL?

The common constraints include:
1. **NOT NULL**: Ensures a column cannot contain NULL values.
2. **UNIQUE**: Ensures all values in a column are distinct.
3. **PRIMARY KEY**: Uniquely identifies each record.
4. **FOREIGN KEY**: Ensures a value in one table matches a value in another table.
5. **CHECK**: Ensures a value meets a condition.

### 40. What is referential integrity in a database?

**Referential integrity** ensures that a foreign key in one table must match a primary key in another table, or it can be NULL. It ensures the relationships between tables are consistent.

Example:
```sql
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```

