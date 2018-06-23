'use-strict'

const generateData = require('./data')
const PolynomialFactory = require('./PolynomialFactory')
const PolynomialRegressor = require('./PolynomialRegressor')

const numIterations = 500
const degree = 3
const learningRate = 0.5

async function printCoefficients (polynomial) {
  polynomial.coefficients.forEach(async param => {
    const value = await param.data()
    console.log(value)
  })
}

async function learnCoefficients () {
  const truePolynomial = PolynomialFactory.randomPolynomial(degree, 1.0)
  const trainingData = generateData(100, truePolynomial)
  const regressor = new PolynomialRegressor(degree, learningRate, numIterations)

  console.log('true')
  printCoefficients(truePolynomial)

  // Train the model!
  const fitted = await regressor.train(trainingData.xs, trainingData.ys, numIterations)

  console.log('fitted')
  printCoefficients(fitted)
}

learnCoefficients()
