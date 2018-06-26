const tf = require('@tensorflow/tfjs')

const optimizers = {
  'SGD': (learningRate) => tf.train.sgd(learningRate),
  'Momentum': (learningRate) => tf.train.momentum(learningRate, 0.5),
  'AdaGrad': (learningRate) => tf.train.adagrad(learningRate),
  'AdaDelta': (learningRate) => tf.train.adadelta(learningRate),
  'Adam': (learningRate) => tf.train.adam(learningRate),
  'AdaMax': (learningRate) => tf.train.adamax(learningRate),
  'RMSProp': (learningRate) => tf.train.rmsprop(learningRate)
}

module.exports = Object.freeze(optimizers)
