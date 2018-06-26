const tf = require('@tensorflow/tfjs')

module.exports = function worker (self) {
  const Polynomial = (coefficients) => {
    return {
      coeffecients: coefficients,
      evaluateTensor: (x) => {
        return tf.tidy(() => {
          const sum = (accumulator, currentValue) => accumulator.add(currentValue)
          const tfPower = (value, index) => value.pow(tf.scalar(index, 'int32'))

          return coefficients.map((coefficient, index) => coefficient.mul(tfPower(x, index)))
            .reduce(sum)
        })
      }
    }
  }

  // A normally distributed coeffecient
  const randomCoefficient = (sigma) => tf.randomNormal([1], 0, sigma)

  // A normally distributed variable coefficient.
  const initialTrainingCoefficient = (sigma) => tf.variable(randomCoefficient(sigma))

  // This function returns a Polynomial with coefficeints defined by an initialiser function.
  const polynomialFromInitialiser = (degree, initialiser, sigma) => {
    const coefficients = Array.apply(null, Array(degree + 1))
      .map(_ => initialiser.call(sigma))

    return Polynomial(coefficients)
  }

  const trainingPolynomial = (degree, sigma = 1.0) => {
    return polynomialFromInitialiser(degree, initialTrainingCoefficient, sigma)
  }

  const randomPolynomial = (degree, sigma = 1.0) => {
    return polynomialFromInitialiser(degree, randomCoefficient, sigma)
  }

  const predict = (params, x) => {
    return params.evaluateTensor(x)
  }

  const loss = (prediction, labels, iteration) => {
    const loss = prediction.sub(labels).square().mean()

    if (iteration % 10 === 0) {
      Promise.all([loss.data(), prediction.data()])
        .then(data => {
          const [lossValue, prediction] = data
          self.postMessage({
            loss: lossValue[0],
            prediction: prediction
          })
        })
    }

    return loss
  }

  const generateData = (numPoints, polynomial) => {
    return tf.tidy(() => {
      const xs = tf.randomUniform([numPoints], -1, 1)

      // Generate polynomial data
      const ys = polynomial.evaluateTensor(xs)
      const noise = tf.randomNormal([numPoints], 0, 0.3)
      const noisyYs = ys.add(noise)

      // Normalize the y values to the range 0 to 1.
      const ymin = noisyYs.min()
      const ymax = noisyYs.max()
      const yrange = ymax.sub(ymin)
      const ysNormalized = noisyYs.sub(ymin).div(yrange)

      return {
        xs: xs,
        ys: ysNormalized
      }
    })
  }

  var xs = null
  var ys = null

  self.addEventListener('message', (e) => {
    switch (e.data.action) {
      case 'generateData':
        const truePolynomial = randomPolynomial(e.data.degree)
        const data = generateData(100, truePolynomial)
        xs = data.xs
        ys = data.ys
        return Promise.all([xs.data(), ys.data()])
          .then(values => {
            self.postMessage({
              trainingData: {
                xs: values[0],
                ys: values[1]
              }
            })
          })
      case 'train':
        if (!xs || !ys) { return }

        self.postMessage({isTraining: true})

        // training
        const optimizer = tf.train.sgd(e.data.learningRate)
        const params = trainingPolynomial(e.data.degree)

        for (let iter = 0; iter < e.data.numIterations; iter++) {
          optimizer.minimize(() => {
            // Feed the examples into the model
            const pred = predict(params, xs)
            return loss(pred, ys, iter)
          })
        }

        self.postMessage({isTraining: false})
        break
      default:
    }
  })
}
