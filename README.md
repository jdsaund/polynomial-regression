# Polynomial Regression

This tool allows fitting degree `n` polynomials to 2D data with some control over the hyperparameters used.

#### Usage

1. `npm install`

2. `npm start`

3. Head to `localhost:3000` if you aren't taken there automatically.

---

#### React js

React was chosen as the view because it is was described as the tool of choice, so it made sense to get as familiar with it as possible. It provided an easy way to build fast views in a painless way for the developer.

#### Materialize CSS

Materialize CSS was used to speed up the visual design process. This provided a way to create a good user experience in the shortest time possible.

#### File structure

Files were split into categories based on their function, with the core files such as the entry point `index.js` at the root directory.

#### Polynomials

Polynomial coefficients are encoded as values, stored in Tensors. This concept is abstracted with the Polynomial class. This was done to avoid code duplication and to abstract the individual TensorFlow API calls to the higher level concept of evaluating a point.

A factory pattern was chosen to create common Polynomial objects. This reduced code complexity.

#### JavaScript Standard Style

JavaScript Standard Style was chosen because it has minimal impact on the developer.

#### TensorFlow.js

The CPU version of TensorFlow.js was used because this project is a lightweight demo and is optimised for compatibility rather than raw performance. In the case of training larger models, the Linux GPU TensorFlow.js is preferred for large performance gains on CUDA enabled Linux systems.

Operations involving evaluating the data were kept as tensor ops where possible to take advantage vast parallelism and to avoid inefficiencies related to moving data in and out of the TensorFlow session.

#### Data synthesis

For a degree `n` polynomial, training data is generated by creating a set of `n` normally-distributed coefficient values, and evaluating `k` points where `k` is the number of training samples desired. All sampling is done within the TensorFlow session to take full advantage of vast parallelism. The simulate noise, another set of `k` normally distributed values are sampled and added to `y` values. The `y` values are then normalized.

#### Training

Coefficient values are found through gradient descent on the training data.

The optimization can be customized by:

- Selecting from a range of TensorFlow optimizers
- Adjusting the number of iterations
- Adjust the learning rate
