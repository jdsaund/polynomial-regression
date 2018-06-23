'use-strict'

const tf = require('@tensorflow/tfjs')
const tfnode = require('@tensorflow/tfjs-node')
const PolynomialFactory = require('./PolynomialFactory')

class PolynomialRegressor {
  /**
   * Creates a PolynomialRegressor.
   */
  constructor (degree, learningRate = 0.5, numIterations = 500, optimizer = tf.train.sgd(learningRate)) {
    this._learningRate = learningRate
    this._numIterations = numIterations
    this._optimizer = optimizer

    this._params = PolynomialFactory.trainingPolynomial(degree)
  }

  /**
   * predict - Creates a tensor of values based on the current parameters
   *
   * @param  {Tensor} x The input values.
   * @return {Tensor}   The output values.
   */
  _predict (x) {
    return this._params.evaluateTensor(x)
  }

  /**
   * loss - The loss function for polynomial regression.
   *
   * @param  {Tensor} prediction The predicted values.
   * @param  {Tensor} labels     The actual values.
   * @return {Tensor}            The loss value.
   */
  _loss (prediction, labels) {
    return prediction.sub(labels).square().mean()
  }

  /**
   * async train - Trains the model.
   *
   * @param  {Tensor} xs The input values of the dataset.
   * @param  {Tensor} ys The output values of the dataset.
   */
  async train (xs, ys) {
    for (let iter = 0; iter < this._numIterations; iter++) {
      this._optimizer.minimize(() => {
        // Feed the examples into the model
        const pred = this._predict(xs)
        return this._loss(pred, ys)
      })
    }

    return this._params
  }
}

module.exports = PolynomialRegressor
