'use-strict'

const tf = require('@tensorflow/tfjs')
const Polynomial = require('./Polynomial')

// A normally distributed coeffecient
const randomCoefficient = (sigma) => tf.randomNormal([1], 0, sigma)

// A normally distributed variable coefficient.
const initialTrainingCoefficient = (sigma) => tf.variable(randomCoefficient(sigma))

// This function returns a Polynomial with coefficeints defined by an initialiser function.
const polynomialFromInitialiser = (degree, initialiser, sigma) => {
  const coefficients = Array.apply(null, Array(degree + 1))
    .map(_ => initialiser.call(sigma))

  return new Polynomial(coefficients)
}

module.exports = {
  /**
   * @static randomPolynomial - Creates a random Polynomial with normally distributed coefficients.
   *
   * @param  {int} degree The degree of the Polynomial.
   * @param  {number} sigma The standard deviation of the coefficients.
   * @return {Polynomial} The Polynomial.
   */
  randomPolynomial: (degree, sigma = 1.0) => {
    return polynomialFromInitialiser(degree, randomCoefficient, sigma)
  },

  /**
   * @static trainingPolynomial - Creates a Polynomial for training,
   * initialised with normally distributed coefficients.
   *
   * @param  {int} degree The degree of the Polynomial.
   * @param  {number} sigma The standard deviation of the coefficients.
   * @return {Polynomial} The Polynomial.
   */
  trainingPolynomial: (degree, sigma = 1.0) => {
    return polynomialFromInitialiser(degree, initialTrainingCoefficient, sigma)
  }
}
