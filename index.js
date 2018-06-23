'use-strict'

const tf = require('@tensorflow/tfjs')
const tfnode = require('@tensorflow/tfjs-node')
const generateData = require('./data')

const a = tf.variable(tf.scalar(Math.random()))
const b = tf.variable(tf.scalar(Math.random()))
const c = tf.variable(tf.scalar(Math.random()))
const d = tf.variable(tf.scalar(Math.random()))

const numIterations = 500
const learningRate = 0.5
const optimizer = tf.train.sgd(learningRate)

function predict (x) {
  // y = a * x ^ 3 + b * x ^ 2 + c * x + d
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(3, 'int32')))
      .add(b.mul(x.square()))
      .add(c.mul(x))
      .add(d)
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
  const trueCoefficients = {a: -0.8, b: -0.2, c: 0.9, d: 0.5}
  const trainingData = generateData(100, trueCoefficients)

  const predictionsBefore = predict(trainingData.xs)
  console.log(trueCoefficients)

  // Train the model!
  await train(trainingData.xs, trainingData.ys, numIterations)

  const predictionsAfter = predict(trainingData.xs)
  console.log(`{a: ${await a.data()}, b: ${await b.data()}}, c: ${await c.data()}, d: ${await d.data()}`)

  tf.dispose(predictionsBefore)
  tf.dispose(predictionsAfter)
}

learnCoefficients()
