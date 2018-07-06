const tf = require('@tensorflow/tfjs')
const PolynomialFactory = require('./PolynomialFactory')
const Defaults = require('../../config/Defaults')
const PolynomialRegressor = require('./PolynomialRegressor')

/**
 * @static tensorDataToChartData - Converts tensors into an array of {x, y} for charting.
 *
 * @param  {Tensor} xs The x values.
 * @param  {Tensor} ys The y values.
 * @return {Array} The chart data.
 */
function tensorDataToChartData (xs, ys) {
  return Promise.all([xs.data(), ys.data()])
    .then(results => {
      const [xValues, yValues] = results
      const untypedXArray = Array.prototype.slice.call(xValues)
      return untypedXArray.map((x, i) => {
        return {
          x: x,
          y: yValues[i]
        }
      })
    })
}

/**
 * @static polynomialPoints - Evaluates a polynomial over a range for charting
 *
 * @param  {Polynomial} polynomial The polynomial.
 * @param  {int} numPoints = 100 The number of points.
 * @param  {number} xmin = -1.0 The minimum x value.
 * @param  {number} xmax = 1.0 The maximum x value.
 * @return {Array} The chart data.
 */
function polynomialPoints (polynomial, numPoints = Defaults.numPoints, xmin = -1.0, xmax = 1.0) {
  if (xmin >= xmax || numPoints <= 0) {
    throw new Error('Unexpected range or number of points.')
  }

  const stride = (xmax - xmin) / (numPoints - 1)

  const xs = Array.from({length: numPoints}, (x, i) => {
    return xmin + i * stride
  })

  const xTensor = tf.tensor1d(xs)
  const yTensor = polynomial.evaluateTensor(xTensor)

  return tensorDataToChartData(xTensor, yTensor)
}

class ChartableRegressor {
  generateData (degree, numPoints) {
    const polynomial = PolynomialFactory.randomPolynomial(degree)

    this._xs = tf.randomUniform([numPoints], -1, 1)

    // Generate polynomial data
    const pureYs = polynomial.evaluateTensor(this._xs)
    const noise = tf.randomNormal([numPoints], 0, 0.3)
    const noisyYs = pureYs.add(noise)

    // Normalize the y values to the range 0 to 1.
    const ymin = noisyYs.min()
    const ymax = noisyYs.max()
    const yrange = ymax.sub(ymin)
    this._ys = noisyYs.sub(ymin).div(yrange)

    return tensorDataToChartData(this._xs, this._ys)
  }

  async train (numIterations, degree, learningRate, optimizer) {
    const fitted = PolynomialRegressor.train(
      this._xs,
      this._ys,
      numIterations,
      degree,
      learningRate,
      optimizer
    )

    return polynomialPoints(fitted)
  }
}

export default ChartableRegressor
