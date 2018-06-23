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

async function learnCoefficients () {
  const trainingData = generateData(100, degree)

  const predictionsBefore = predict(trainingData.xs)

  // Train the model!
  await train(trainingData.xs, trainingData.ys, numIterations)

  const predictionsAfter = predict(trainingData.xs)
  console.log(`{a: ${await params.coefficients[3].data()}, b: ${await params.coefficients[2].data()}}, c: ${await params.coefficients[1].data()}, d: ${await params.coefficients[0].data()}`)

  tf.dispose(predictionsBefore)
  tf.dispose(predictionsAfter)
}

learnCoefficients()
