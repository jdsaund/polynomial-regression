import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import Hyperparameters from './components/Hyperparameters'
import Data from './components/Data'
import Training from './components/Training'
import Output from './components/Output'

import generateData from './services/Data/DataSynthesizer'
import PolynomialFactory from './services/PolynomialRegression/PolynomialFactory'
import PolynomialRegressor from './services/PolynomialRegression/PolynomialRegressor'

class App extends Component {
  constructor (props) {
    super(props)
    const defaultHyperparameters = {
      degree: 3
    }
    this.truePolynomial = PolynomialFactory.randomPolynomial(defaultHyperparameters.degree, 1.0)
    this.state = {
      trainingData: generateData(1000, this.truePolynomial),
      hyperparameters: defaultHyperparameters
    }
  }

  async train () {
    const degree = (this.state.hyperparameters || {}).degree || 3
    const learningRate = (this.state.hyperparameters || {}).learningRate || 0.25
    const numIterations = 500
    const regressor = new PolynomialRegressor(degree, learningRate, numIterations)

    // Train the model!
    const fitted = await regressor.train(this.state.trainingData.xs, this.state.trainingData.ys, numIterations)

    this.setState({
      fitted: fitted
    })
  }

  updateHyperparameters (childState) {
    this.setState({
      hyperparameters: childState
    })
  }

  generate () {
    this.truePolynomial = PolynomialFactory.randomPolynomial(this.state.hyperparameters.degree, 1.0)
    return this.setState({
      trainingData: generateData(1000, this.truePolynomial)
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
              <Data startGenerate={this.generate.bind(this)} />
            </Col>
            <Col s={6}>
              <Output fitted={this.state.fitted} trainingData={this.state.trainingData} />
            </Col>
            <Col s={3}>
              <Training onChange={(isTraining) => this.train(isTraining)} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
