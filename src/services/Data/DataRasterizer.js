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
}

module.exports = DataRasterizer
