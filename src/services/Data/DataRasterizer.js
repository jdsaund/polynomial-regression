const tf = require('@tensorflow/tfjs')

class DataRasterizer {
  /**
   * @static tensorDataToChartData - Converts tensors into an array of {x, y} for charting.
   *
   * @param  {Tensor} xs The x values.
   * @param  {Tensor} ys The y values.
   * @return {Array} The chart data.
   */
  static tensorDataToChartData (xs, ys) {
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
   * @static separateAxesToChartData - Converts two float 32 arrays into an array of {x, y} for charting.
   *
   * @param  {float32array} xValues The x values.
   * @param  {float32array} yValues The y values.
   * @return {Array} The chart data.
   */
  static separateAxesToChartData (xValues, yValues) {
    const untypedXArray = Array.prototype.slice.call(xValues)
    return untypedXArray.map((x, i) => {
      return {
        x: x,
        y: yValues[i]
      }
    })
  }

  /**
   * @static rasterizePolynomial - Evaluates a polynomial over a range for charting
   *
   * @param  {Polynomial} polynomial The polynomial.
   * @param  {number} xmin = -1.0 The minimum x value.
   * @param  {number} xmax = 1.0 The maximum x value.
   * @param  {int} numPoints = 100 The number of points.
   * @return {Array} The chart data.
   */
  static rasterizePolynomial (polynomial, xmin = -1.0, xmax = 1.0, numPoints = 100) {
    if (xmin >= xmax || numPoints <= 0) {
      throw new Error('Unexpected range or number of points.')
    }

    const stride = (xmax - xmin) / (numPoints - 1)

    const xs = Array.from({length: numPoints}, (x, i) => {
      return xmin + i * stride
    })

    const xTensor = tf.tensor1d(xs)
    const yTensor = polynomial.evaluateTensor(xTensor)

    return DataRasterizer.tensorDataToChartData(xTensor, yTensor)
  }
}

module.exports = DataRasterizer
