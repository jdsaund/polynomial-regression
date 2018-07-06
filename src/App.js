import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import Hyperparameters from './containers/Hyperparameters'
import Data from './containers/Data'
import Training from './containers/Training'
import Output from './containers/Output'
import Defaults from './config/Defaults'
import Optimizers from './config/Optimizers'
import generateData from './services/Data/DataSynthesizer'
import PolynomialRegressor from './services/PolynomialRegression/PolynomialRegressor'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shouldStopTraining: false,
      trainingData: generateData(Defaults.degree, Defaults.numPoints),
      hyperparameters: Object.assign({}, Defaults),
      dataOptions: {degree: Defaults.degree}
    }
  }

  /**
   * trainingIteration - Does a training iteration so that the view can see progress.
   */
  trainingIteration (regressor, iterations) {
    if (this.state.shouldStopTraining) iterations = 0

    setTimeout(() => {
      regressor.train(this.state.trainingData.xs, this.state.trainingData.ys)
        .then(fitted => {
          this.setState({
            // react doesn't like updating the state with the same memory address in a loop
            fitted: iterations % 2 === 0 ? fitted : null,
            isTraining: iterations > 0
          })

          console.log(this.state.isTraining)

          if (iterations > 0) this.trainingIteration(regressor, iterations - 1)
        })
    }, 0)
  }

  /**
   * train - Trains the model
   */
  train () {
    if (this.state.isTraining) {
      this.setState({
        shouldStopTraining: true
      })

      return
    }

    const degree = this.state.hyperparameters.degree
    const learningRate = this.state.hyperparameters.learningRate
    let numIterations = this.state.hyperparameters.numIterations
    const optimizerKey = this.state.hyperparameters.optimizer
    const optimizer = Optimizers[optimizerKey](learningRate)
    const regressor = new PolynomialRegressor(degree, learningRate, optimizer)

    this.setState({
      shouldStopTraining: false,
      isTraining: true
    }, () => {
      this.trainingIteration(regressor, numIterations)
    })
  }

  /**
   * updateDataOptions - Updates the data options and stores them in the state.
   *
   * @param  {object} childState The new data options.
   */
  updateDataOptions (childState) {
    this.setState({
      dataOptions: childState
    })
  }

  /**
   * updateHyperparameters - Updates the hyperparameters and stores them in the state.
   *
   * @param  {object} childState The new hyperparameters.
   */
  updateHyperparameters (childState) {
    const updated = Object.assign(this.state.hyperparameters, childState)
    this.setState({
      hyperparameters: updated
    })
  }

  /**
   * generate - Generates training data and stores it in the state.
   *
   * @return {Promise} The Promise.
   */
  generate () {
    return this.setState({
      trainingData: generateData(this.state.dataOptions.degree, Defaults.numPoints)
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='header teal white-text section'>
          <Row className='center'>
            <h3>Polynomial Regressor</h3>
          </Row>
        </div>
        <div className='header'>
          <Hyperparameters onChange={this.updateHyperparameters.bind(this)} />
        </div>
        <div className='header white black-text'>
          <Row>
            <Col s={3}>
              <Data startGenerate={this.generate.bind(this)} onChange={this.updateDataOptions.bind(this)} />
            </Col>
            <Col s={6}>
              <Output fitted={this.state.fitted} trainingData={this.state.trainingData} />
            </Col>
            <Col s={3}>
              <Training onChange={this.train.bind(this)} isTraining={this.state.isTraining} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
