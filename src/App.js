import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import Hyperparameters from './containers/Hyperparameters'
import Data from './containers/Data'
import Training from './containers/Training'
import Output from './containers/Output'
import Defaults from './config/Defaults'
import ChartableRegressor from './services/PolynomialRegression/ChartableRegressor'

class App extends Component {
  constructor (props) {
    super(props)

    this.regressor = new ChartableRegressor()

    this.state = {
      hyperparameters: Object.assign({}, Defaults),
      dataOptions: {degree: Defaults.degree, numPoints: Defaults.numPoints}
    }

    this.generate()
  }

  /**
   * async train - Trains the model
   */
  train () {
    const {degree, learningRate, numIterations, optimizer} = this.state.hyperparameters

    this.regressor.train(numIterations, degree, learningRate, optimizer)
      .then(data => {
        this.setState({
          fittedData: data
        })
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
    this.regressor.generateData(this.state.dataOptions.degree, this.state.dataOptions.numPoints)
      .then(data => {
        this.setState({
          trainingData: data
        })
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
              <Output fittedData={this.state.fittedData} trainingData={this.state.trainingData} />
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
