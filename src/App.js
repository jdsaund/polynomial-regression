import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import Hyperparameters from './components/Hyperparameters'
import Data from './components/Data'
import Training from './components/Training'
import Output from './components/Output'
import Defaults from './config/Defaults'

import generateData from './services/Data/DataSynthesizer'
import PolynomialFactory from './services/PolynomialRegression/PolynomialFactory'
import PolynomialRegressor from './services/PolynomialRegression/PolynomialRegressor'

class App extends Component {
  constructor (props) {
    super(props)
    const defaultHyperparameters = {
      degree: Defaults.degree
    }
    this.truePolynomial = PolynomialFactory.randomPolynomial(defaultHyperparameters.degree)
    this.state = {
      trainingData: generateData(Defaults.numPoints, this.truePolynomial),
      hyperparameters: defaultHyperparameters,
      dataOptions: defaultHyperparameters
    }
  }

  async train () {
    const degree = (this.state.hyperparameters || {}).degree || Defaults.degree
    const learningRate = (this.state.hyperparameters || {}).learningRate || Defaults.learningRate
    const numIterations = Defaults.numIterations
    const regressor = new PolynomialRegressor(degree, learningRate)

    // Train the model!
    const fitted = await regressor.train(this.state.trainingData.xs, this.state.trainingData.ys, numIterations)

    this.setState({
      fitted: fitted
    })
  }

  updateDataOptions (childState) {
    this.setState({
      dataOptions: childState
    })
  }

  updateHyperparameters (childState) {
    this.setState({
      hyperparameters: childState
    })
  }

  generate () {
    this.truePolynomial = PolynomialFactory.randomPolynomial(this.state.dataOptions.degree)
    return this.setState({
      trainingData: generateData(Defaults.numPoints, this.truePolynomial)
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
