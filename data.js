const tf = require('@tensorflow/tfjs')
const PolynomialFactory = require('./PolynomialFactory')

function generateData (numPoints, degree, sigma = 0.04) {
  return tf.tidy(() => {
    const polynomial = PolynomialFactory.randomPolynomial(degree, sigma)

    const xs = tf.randomUniform([numPoints], -1, 1)

    // Generate polynomial data
    const ys = polynomial.evaluateTensor(xs)

    // Normalize the y values to the range 0 to 1.
    const ymin = ys.min()
    const ymax = ys.max()
    const yrange = ymax.sub(ymin)
    const ysNormalized = ys.sub(ymin).div(yrange)

    return {
      xs,
      ys: ysNormalized
    }
  })
}
module.exports = generateData
