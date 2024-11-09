# Advanced Python Pandas Questions and Solutions

## Table of Contents
1. [Introduction](#introduction)
2. [Question 1: How to filter rows based on a condition?](#question-1)
3. [Question 2: How to sort a DataFrame by multiple columns?](#question-2)
4. [Question 3: How to apply a custom function to a DataFrame column?](#question-3)
5. [Question 4: How to pivot a DataFrame?](#question-4)
6. [Question 5: How to handle missing data?](#question-5)
7. [Question 6: How to merge two DataFrames based on a key?](#question-6)
8. [Question 7: How to group data and calculate aggregate statistics?](#question-7)
9. [Question 8: How to handle large datasets using chunking?](#question-8)
10. [Question 9: How to reshape a DataFrame using `melt`?](#question-9)
11. [Question 10: How to perform a left join between two DataFrames?](#question-10)
12. [Question 11: How to remove duplicates from a DataFrame?](#question-11)
13. [Question 12: How to create a rolling window calculation?](#question-12)
14. [Question 13: How to select rows based on a list of values?](#question-13)
15. [Question 14: How to set and reset the index of a DataFrame?](#question-14)
16. [Question 15: How to concatenate multiple DataFrames?](#question-15)
17. [Question 16: How to find the correlation between columns?](#question-16)
18. [Question 17: How to find the unique values in a column?](#question-17)
19. [Question 18: How to create a new column based on conditions?](#question-18)
20. [Question 19: How to sample rows randomly from a DataFrame?](#question-19)
21. [Question 20: How to plot data directly from Pandas?](#question-20)

---

## Introduction
This section provides 20 advanced questions and solutions for mastering Pandas. Each solution demonstrates a practical approach to working with data efficiently using Pandas.

---

## Question 1: How to filter rows based on a condition?

### Solution:
To filter rows where a column meets a specific condition:

```python
import pandas as pd

df = pd.DataFrame({'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [23, 35, 45]})
# Filter rows where Age > 30
filtered_df = df[df['Age'] > 30]
print(filtered_df)
