const tf = require('@tensorflow/tfjs')

/**
 * generateData - Generates a synthetic dataset.
 *
 * @param  {int} numPoints The number of samples.
 * @param  {Polynomial} polynomial The polynomial to model from.
 * @return {object} The Data.
 */
function generateData (numPoints, polynomial) {
  return tf.tidy(() => {
    const xs = tf.randomUniform([numPoints], -1, 1)

    // Generate polynomial data
    const ys = polynomial.evaluateTensor(xs)

    // Normalize the y values to the range 0 to 1.
    const ymin = ys.min()
    const ymax = ys.max()
    const yrange = ymax.sub(ymin)
    const ysNormalized = ys.sub(ymin).div(yrange)

    return {
      xs: xs,
      ys: ysNormalized
    }
  })
}

module.exports = generateData