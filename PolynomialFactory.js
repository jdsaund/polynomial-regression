'use-strict'

const tf = require('@tensorflow/tfjs')
const Polynomial = require('./Polynomial')

class PolynomialFactory {
  /**
   * @static randomPolynomial - Creates a Polynomial with normally distributed coefficients.
   *
   * @param  {int} degree The degree of the Polynomial.
   * @return {Polynomial} The Plynomial.
   */
  static randomPolynomial (degree, sigma = 0.04) {
    const coefficients = Array.apply(null, Array(degree + 1))
      .map(_ => tf.randomNormal([1], 0, sigma))

    return new Polynomial(coefficients)
  }
}

module.exports = PolynomialFactory
