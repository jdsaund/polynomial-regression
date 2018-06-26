import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import Hyperparameters from './containers/Hyperparameters'
import Data from './containers/Data'
import Training from './containers/Training'
import Output from './containers/Output'
import Defaults from './config/Defaults'
import Optimizers from './config/Optimizers'
import generateData from './services/Data/DataSynthesizer'
import PolynomialFactory from './services/PolynomialRegression/PolynomialFactory'
import PolynomialRegressor from './services/PolynomialRegression/PolynomialRegressor'

class App extends Component {
  constructor (props) {
    super(props)

    const truePolynomial = PolynomialFactory.randomPolynomial(Defaults.degree)
    this.state = {
      trainingData: generateData(Defaults.numPoints, truePolynomial),
      hyperparameters: Object.assign({}, Defaults),
      dataOptions: {degree: Defaults.degree}
    }
  }

  /**
   * async train - Trains the model
   */
  async train () {
    const degree = this.state.hyperparameters.degree
    const learningRate = this.state.hyperparameters.learningRate
    const numIterations = this.state.hyperparameters.numIterations
    const optimizerKey = this.state.hyperparameters.optimizer
    const optimizer = Optimizers[optimizerKey](learningRate)
    const regressor = new PolynomialRegressor(degree, learningRate, optimizer)

    const fitted = await regressor.train(this.state.trainingData.xs, this.state.trainingData.ys, numIterations)

    this.setState({
      fitted: fitted
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
    const truePolynomial = PolynomialFactory.randomPolynomial(this.state.dataOptions.degree)
    return this.setState({
      trainingData: generateData(Defaults.numPoints, truePolynomial)
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
              <Training onChange={this.train.bind(this)} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
