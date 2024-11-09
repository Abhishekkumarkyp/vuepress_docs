# Pandas in Python

## Table of Contents
1. [Introduction to Pandas](#introduction-to-pandas)
2. [Installing Pandas](#installing-pandas)
3. [Pandas Data Structures](#pandas-data-structures)
    - [Series](#series)
    - [DataFrame](#dataframe)
4. [Basic Operations on DataFrames](#basic-operations-on-dataframes)
5. [Data Selection](#data-selection)
    - [Selecting Rows and Columns](#selecting-rows-and-columns)
    - [Filtering Data](#filtering-data)
6. [Data Manipulation](#data-manipulation)
    - [Adding/Removing Columns](#addingremoving-columns)
    - [Sorting](#sorting)
    - [Grouping](#grouping)
7. [Handling Missing Data](#handling-missing-data)
8. [Input and Output](#input-and-output)
9. [Descriptive Statistics](#descriptive-statistics)
10. [Merging, Joining, and Concatenating](#merging-joining-and-concatenating)
11. [Time Series](#time-series)
12. [Plotting with Pandas](#plotting-with-pandas)

---

## Introduction to Pandas
Pandas is an open-source data analysis and manipulation library built on top of Python. It provides fast, flexible, and expressive data structures for working with relational or labeled data.

## Installing Pandas
To install Pandas, use pip:
```bash
pip install pandas
```


# Pandas Data Structures

## Series
A Series is a one-dimensional labeled array capable of holding any data type.

```python
import pandas as pd
s = pd.Series([1, 3, 5, 7, 9])
```
```python
data = {'Name': ['John', 'Anna', 'Peter'], 'Age': [28, 24, 35]}
df = pd.DataFrame(data)
```

## Data Selection
    Selecting Rows and Columns
    Select Column: df['column_name']
    Select Multiple Columns: df[['column1', 'column2']]
    Select Row by Index: df.iloc[0]
    Select Row by Label: df.loc['label']
```python 
df[df['Age'] > 30]
```

### Data Manipulation
Adding/Removing Columns
Add a new column:
```python

df['Salary'] = [5000, 4000, 3000]\
```
### Remove a column:

```python
df.drop('Salary', axis=1, inplace=True)
```

### Sorting
Sort by values:
```python   
df.sort_values('Age', ascending=False)
  ```
### Grouping
Group by column:
```python    
df.groupby('Age').mean()
 ```
Handling Missing Data
Check for missing values:
```python     
df.isnull().sum()
```
### Drop missing values:
```python    
df.dropna()
 ```
### Fill missing values:
```python     
```
df.fillna(0)
### Input and Output
Read CSV:
```python     
df = pd.read_csv('file.csv')
```
### Write to CSV:
```python     
df.to_csv('output.csv', index=False)
```
### Read Excel:
```python     
df = pd.read_excel('file.xlsx')
```
### Write to Excel:
```python    
df.to_excel('output.xlsx', index=False)
 ```
### Descriptive Statistics
Basic Statistics:
```python    
df.describe()
Sum: df.sum()
Mean: df.mean()
Median: df.median()
Standard Deviation: df.std()
Merging, Joining, and Concatenating
 ```
### Merge DataFrames:
```python   
pd.merge(df1, df2, on='column')
  ```
### Concatenate DataFrames:
```python   
pd.concat([df1, df2])
  ```
### Time Series
Convert to datetime:
```python  
df['date'] = pd.to_datetime(df['date'])
   ```
### Set datetime as index:
```python    
df.set_index('date', inplace=True)
 ```
### Resampling:
```python    
df.resample('M').mean()  # Resample by month
 ```
### Plotting with Pandas
Pandas integrates with Matplotlib for data visualization:
```python`
df.plot(kind='line')  # Line plot
df.plot(kind='bar')   # Bar plot
df.plot(kind='hist')  # Histogram
```

