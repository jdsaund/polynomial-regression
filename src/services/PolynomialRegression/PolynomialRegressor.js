const Optimizers = require('../../config/Optimizers')
const PolynomialFactory = require('./PolynomialFactory')

/**
 * predict - Creates a tensor of values based on the current parameters
 *
 * @param  {Tensor} x The input values.
 * @return {Tensor}   The output values.
 */
function predict (params, x) {
  return params.evaluateTensor(x)
}

/**
 * loss - The loss function for polynomial regression.
 *
 * @param  {Tensor} prediction The predicted values.
 * @param  {Tensor} labels     The actual values.
 * @return {Tensor}            The loss value.
 */
function loss (prediction, labels) {
  return prediction.sub(labels).square().mean()
}

class PolynomialRegressor {
  /**
   * async train - Trains the model.
   *
   * @param  {Tensor} xs The x values of the dataset.
   * @param  {Tensor} ys The y values of the dataset.
   * @param  {int} numIterations The number of training iterations.
   * @param  {int} degree The degrees.
   * @param  {int} learningRate The learningRate.
   * @param  {int} optimizerKey The optimizerKey.
   * @return {Polynomial} The polynomial.
   */
  static train (xs, ys, numIterations, degree, learningRate, optimizerKey) {
    const optimizer = Optimizers[optimizerKey](learningRate)
    const params = PolynomialFactory.trainingPolynomial(degree)
    for (let iter = 0; iter < numIterations; iter++) {
      optimizer.minimize(() => {
        // Feed the examples into the model
        const pred = predict(params, xs)
        return loss(pred, ys)
      })
    }

    return params
  }
}

module.exports = PolynomialRegressor
