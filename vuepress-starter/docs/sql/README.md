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

