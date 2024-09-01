---
sidebarDepth: 2
---
# Support Vector Machines (SVM) in Python

## 1. Introduction to Support Vector Machines (SVM)
- **Definition:** SVM is a **supervised machine learning algorithm** primarily used for **classification** tasks but can also be applied to **regression**. It aims to find the best separating **hyperplane** (decision boundary) that maximizes the **margin** between different classes in the feature space.
- **Key Concepts:**
  - **Hyperplane:** A **decision boundary** that separates data points of different classes.
  - **Margin:** The distance between the hyperplane and the nearest data point of any class. SVM tries to **maximize this margin**.
  - **Support Vectors:** The data points that are **closest to the hyperplane** and influence its position and orientation.

## 2. Types of SVM

### 1 Linear SVM
- **Linear SVM:** Used when data is **linearly separable**, i.e., it can be separated by a **straight line** (in 2D) or a **hyperplane** (in higher dimensions).

### 2 Non-Linear SVM
- **Non-Linear SVM:** Used when data is **not linearly separable**. It uses **kernel functions** to transform data into a higher dimension where it becomes linearly separable.


## 3. Kernel Functions
- **Linear Kernel:** Used for linearly separable data.
- **Polynomial Kernel:** Maps the original data into a higher-dimensional space using polynomials.
- **Radial Basis Function (RBF) Kernel:** The most commonly used kernel for non-linear data. It measures the similarity between points and maps them into a higher-dimensional space.
- **Sigmoid Kernel:** Similar to a neural network, less commonly used.

## 4. Advantages of SVM
- Effective in high-dimensional spaces.
- Works well when the number of dimensions exceeds the number of samples.
- Memory efficient, as it uses a subset of training points in the decision function (support vectors).

## 5. Disadvantages of SVM
- Not suitable for large datasets due to high training time.
- Performance drops when the number of features is much greater than the number of samples.
- Less effective on noisy datasets with overlapping classes.

## 6. SVM Implementation in Python
- **Libraries Required:**
  - `numpy`: For numerical operations.
  - `pandas`: For data manipulation.
  - `scikit-learn`: For implementing the SVM algorithm.

```python
# Importing libraries
import numpy as np
import pandas as pd
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# Loading dataset
iris = datasets.load_iris()
X = iris.data
y = iris.target

# Splitting dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Creating and training the SVM model
model = SVC(kernel='linear')  # You can change the kernel to 'poly', 'rbf', etc.
model.fit(X_train, y_train)

# Making predictions
y_pred = model.predict(X_test)

# Evaluating the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')
print('Classification Report:')
print(classification_report(y_test, y_pred))
```



## 7. Key Parameters of `SVC` in Scikit-learn
- `C`: Regularization parameter. A large `C` means you’ll get a smaller margin hyperplane (less regularization), and a small `C` creates a larger margin hyperplane (more regularization).
- `kernel`: Specifies the kernel type to be used in the algorithm. Common options include `'linear'`, `'poly'`, `'rbf'`, and `'sigmoid'`.
- `gamma`: Kernel coefficient for ‘rbf’, ‘poly’, and ‘sigmoid’. Controls the influence of individual training samples. Low values mean ‘far’ and high values mean ‘close’.

## 8. Tuning the Model
- **Grid Search:** Used to find the optimal combination of hyperparameters like `C`, `kernel`, and `gamma`.
- **Cross-Validation:** Used to assess how the model generalizes to an independent dataset.

```python
from sklearn.model_selection import GridSearchCV

# Defining the parameter grid
param_grid = {'C': [0.1, 1, 10, 100],
              'gamma': [1, 0.1, 0.01, 0.001],
              'kernel': ['linear', 'rbf', 'poly']}

# Performing Grid Search
grid = GridSearchCV(SVC(), param_grid, refit=True, verbose=2)
grid.fit(X_train, y_train)

# Best parameters and model evaluation
print(f'Best Parameters: {grid.best_params_}')
grid_predictions = grid.predict(X_test)
print(f'Accuracy after tuning: {accuracy_score(y_test, grid_predictions) * 100:.2f}%')
print('Classification Report after tuning:')
print(classification_report(y_test, grid_predictions))
```

## 9. Use Cases of SVM
- **Image Classification:** SVMs are widely used in image recognition tasks.
- **Text Categorization:** SVMs can classify documents into different categories.
- **Bioinformatics:** Used for classifying genes, proteins, etc.

## 10. Conclusion
- SVM is a powerful and flexible classifier, particularly well-suited for binary classification problems. By selecting appropriate kernel functions and hyperparameters, SVMs can perform well even with non-linear data. However, careful tuning and consideration of data characteristics are essential to leverage SVM's full potential.

