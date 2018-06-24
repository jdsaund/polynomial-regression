import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import InputSelect from './InputSelect'

class Hyperparameters extends Component {
  updateOptimiser (event) {
    console.log(`optimiser changed to ${event.target.value}`)
  }

  updateLossFunction (event) {
    console.log(`loss function changed to ${event.target.value}`)
  }

  updateLearningRate (event) {
    console.log(`learning rate changed to ${event.target.value}`)
  }

  updateDegree (event) {
    console.log(`degree changed to ${event.target.value}`)
  }

  render () {
    const degreeOpts = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5'
    ]

    const learningRateOpts = [
      '0.05',
      '0.10',
      '0.25',
      '0.50',
      '0.75',
      '1.00'
    ]

    const optimiserOpts = [
      'SGD',
      '9',
      '8',
      '7'
    ]

    const lossFunctionOpts = [
      'Mean Squared Error',
      '2',
      '3',
      '4'
    ]

    return (
      <Row className='z-depth-2 white black-text offset-s2 section'>
        <Row>
          <Col offset='s2' s={12}>
            <h5>Hyperparameters</h5>
          </Col>
        </Row>
        <Row>
          <Col offset='s2' s={12}>
            <Col s={2}>
              <InputSelect optionValues={degreeOpts} label='Degree' onChange={this.updateDegree.bind(this)} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={learningRateOpts} label='Learning rate' onChange={this.updateLearningRate.bind(this)} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={optimiserOpts} label='Optimiser' onChange={this.updateOptimiser.bind(this)} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={lossFunctionOpts} label='Loss function' onChange={this.updateLossFunction.bind(this)} />
            </Col>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Hyperparameters
