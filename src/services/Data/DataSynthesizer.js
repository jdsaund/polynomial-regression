const tf = require('@tensorflow/tfjs')
const PolynomialFactory = require('../PolynomialRegression/PolynomialFactory')

/**
 * generateData - Generates a synthetic dataset.
 *
 * @param  {int} degree The degree of the polynomial.
 * @param  {int} numPoints The number of samples.
 * @return {object} The Data.
 */
function generateData (degree, numPoints) {
  const polynomial = PolynomialFactory.randomPolynomial(degree)

  return tf.tidy(() => {
    const xs = tf.randomUniform([numPoints], -1, 1)

    // Generate polynomial data
    const ys = polynomial.evaluateTensor(xs)
    const noise = tf.randomNormal([numPoints], 0, 0.3)
    const noisyYs = ys.add(noise)

    // Normalize the y values to the range 0 to 1.
    const ymin = noisyYs.min()
    const ymax = noisyYs.max()
    const yrange = ymax.sub(ymin)
    const ysNormalized = noisyYs.sub(ymin).div(yrange)

    return {
      xs: xs,
      ys: ysNormalized
    }
  })
}

module.exports = generateData
