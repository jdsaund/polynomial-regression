'use-strict'

const tf = require('@tensorflow/tfjs')
const tfnode = require('@tensorflow/tfjs-node')
const generateData = require('./data')
const PolynomialFactory = require('./PolynomialFactory')

const numIterations = 500
const degree = 3
const learningRate = 0.5
const optimizer = tf.train.sgd(learningRate)

// create the parameters parametrically
const params = PolynomialFactory.trainingPolynomial(degree)

function predict (x) {
  return params.evaluateTensor(x)
}

function loss (prediction, labels) {
  // Having a good error function is key for training a machine learning model
  const error = prediction.sub(labels).square().mean()
  return error
}

async function train (xs, ys, numIterations) {
  for (let iter = 0; iter < numIterations; iter++) {
    optimizer.minimize(() => {
      // Feed the examples into the model
      const pred = predict(xs)
      return loss(pred, ys)
    })
  }
}

async function printCoefficients (polynomial) {
  polynomial.coefficients.forEach(async param => {
    const value = await param.data()
    console.log(value)
  })
}

async function learnCoefficients () {
  const truePolynomial = PolynomialFactory.randomPolynomial(degree, 1.0)
  const trainingData = generateData(100, truePolynomial)

  console.log('true')
  printCoefficients(truePolynomial)

  // Train the model!
  await train(trainingData.xs, trainingData.ys, numIterations)

  console.log('fitted')
  printCoefficients(params)
}

learnCoefficients()
