'use-strict'

const tf = require('@tensorflow/tfjs')
const tfnode = require('@tensorflow/tfjs-node')
const generateData = require('./data')
const Polynomial = require('./Polynomial')

const numIterations = 500
const degree = 3
const learningRate = 0.5
const optimizer = tf.train.sgd(learningRate)

// create the parameters parametrically
const params = Array.apply(null, Array(degree + 1))
  .map(_ => tf.variable(tf.scalar(Math.random())))

function predict (x) {
  return tf.tidy(() => {
    const sum = (accumulator, currentValue) => accumulator.add(currentValue)
    const tfPower = (value, index) => value.pow(tf.scalar(index, 'int32'))

    // evaluate the polynomial value at x functionally
    return params.map((coefficient, index) => coefficient.mul(tfPower(x, index)))
      .reduce(sum)
  })
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
  console.log(`{a: ${await params[3].data()}, b: ${await params[2].data()}}, c: ${await params[1].data()}, d: ${await params[0].data()}`)

  tf.dispose(predictionsBefore)
  tf.dispose(predictionsAfter)
}

learnCoefficients()
