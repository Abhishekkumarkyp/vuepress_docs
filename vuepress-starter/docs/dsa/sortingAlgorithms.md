---
sidebarDepth: 2
---
# Sorting Algorithms

Sorting algorithms are essential tools in computer science used to arrange data in a particular order. Below is a detailed explanation of various sorting algorithms with examples and performance analysis:

## 1. Comparison-Based Sorting Algorithms

### Merge Sort

**Key Points:**
- Uses the divide-and-conquer technique.
- Splits the array into halves, recursively sorts them, and merges the sorted halves.

**Time Complexity:**
- Best, Worst, and Average: \(O(n \log n)\)

**Space Complexity:**
- \(O(n)\) (additional memory for merging).

**Example:**
```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1

# Example Usage
arr = [38, 27, 43, 3, 9, 82, 10]
merge_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [3, 9, 10, 27, 38, 43, 82]
```

### Quick Sort

**Key Points:**
- Divides the array based on a pivot and sorts the partitions.
- Performs well with randomized pivots but poorly with already sorted arrays (without optimization).

**Time Complexity:**
- Best/Average: \(O(n \log n)\)
- Worst: \(O(n^2)\)

**Space Complexity:**
- \(O(\log n)\) (due to recursion).

**Example:**
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]
        lesser = [x for x in arr[1:] if x <= pivot]
        greater = [x for x in arr[1:] if x > pivot]
        return quick_sort(lesser) + [pivot] + quick_sort(greater)

# Example Usage
arr = [10, 7, 8, 9, 1, 5]
arr = quick_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [1, 5, 7, 8, 9, 10]
```

## 2. Simple Quadratic Sorting Algorithms

### Bubble Sort

**Key Points:**
- Repeatedly swaps adjacent elements if they are in the wrong order.
- Inefficient for large datasets.

**Time Complexity:**
- \(O(n^2)\)

**Space Complexity:**
- \(O(1)\)

**Example:**
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# Example Usage
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [11, 12, 22, 25, 34, 64, 90]
```

### Selection Sort

**Key Points:**
- Selects the smallest element and places it at the beginning.
- Simple but inefficient for large datasets.

**Time Complexity:**
- \(O(n^2)\)

**Space Complexity:**
- \(O(1)\)

**Example:**
```python
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# Example Usage
arr = [64, 25, 12, 22, 11]
selection_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [11, 12, 22, 25, 64]
```

### Insertion Sort

**Key Points:**
- Inserts each element into its correct position in a sorted portion.
- Efficient for small or nearly sorted datasets.

**Time Complexity:**
- Best: \(O(n)\)
- Worst/Average: \(O(n^2)\)

**Space Complexity:**
- \(O(1)\)

**Example:**
```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Example Usage
arr = [12, 11, 13, 5, 6]
insertion_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [5, 6, 11, 12, 13]
```

## 3. Heap-Based Sorting Algorithm

### Heap Sort

**Key Points:**
- Uses a binary heap to build a max heap and extracts the maximum element.
- Efficient for large datasets.

**Time Complexity:**
- \(O(n \log n)\)

**Space Complexity:**
- \(O(1)\)

**Example:**
```python
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[i] < arr[left]:
        largest = left

    if right < n and arr[largest] < arr[right]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

# Example Usage
arr = [12, 11, 13, 5, 6, 7]
heap_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [5, 6, 7, 11, 12, 13]
```

## 4. Non-Comparison-Based Sorting Algorithms

### Counting Sort

**Key Points:**
- Efficient for small range integers.
- Does not compare elements but counts the frequency of each value.

**Time Complexity:**
- \(O(n + k)\), where \(k\) is the range of the input.

**Space Complexity:**
- \(O(n + k)\).

**Example:**
```python
def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)

    for num in arr:
        count[num] += 1

    i = 0
    for num in range(len(count)):
        while count[num] > 0:
            arr[i] = num
            i += 1
            count[num] -= 1

# Example Usage
arr = [4, 2, 2, 8, 3, 3, 1]
counting_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [1, 2, 2, 3, 3, 4, 8]
```

### Radix Sort

**Key Points:**
- Sorts integers by processing digits from least significant to most significant.
- Often used with counting sort as a subroutine.

**Time Complexity:**
- \(O(nk)\), where \(k\) is the number of digits.

**Space Complexity:**
- \(O(n + k)\).

**Example:**
```python
def counting_sort_for_radix(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_for_radix(arr, exp)
        exp *= 10

# Example Usage
arr = [170, 45, 75, 90, 802, 24, 2, 66]
radix_sort(arr)
print("Sorted array:", arr)
```
**Output:**
```
Sorted array: [2, 24, 45, 66, 75, 90, 170, 802]
```

## Conclusion
Sorting algorithms are diverse, each suited for different types of datasets and requirements. The choice of algorithm depends on factors like input size, memory constraints, and desired performance.
