'use-strict'

const tf = require('@tensorflow/tfjs')

class Polynomial {
  /**
   * constructor - Creates a Polynomial.
   *
   * @param  {Tensor} coefficients The coefficient values of the polynomial
   */
  constructor (coefficients) {
    this.coefficients = coefficients
    this.degree = coefficients.length - 1
  }

  /**
   * evaluate - Evaluates a the value for a given tensor
   *
   * @param  {Tensor} x The tensor containing the point(s)
   * @return {Tensor}   The tensor of values
   */
  evaluateTensor (x) {
    return tf.tidy(() => {
      const sum = (accumulator, currentValue) => accumulator.add(currentValue)
      const tfPower = (value, index) => value.pow(tf.scalar(index, 'int32'))

      return this.coefficients.map((coefficient, index) => coefficient.mul(tfPower(x, index)))
        .reduce(sum)
    })
  }
}

module.exports = Polynomial
