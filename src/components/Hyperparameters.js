import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import InputSelect from './InputSelect'
import InputNumber from './InputNumber'

const degreeConfig = {
  id: 'degree',
  defaultOption: '3',
  options: [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5'
  ]
}

const learningRateConfig = {
  id: 'learningRate',
  defaultOption: '0.25',
  options: [
    '0.05',
    '0.10',
    '0.25',
    '0.50',
    '0.75',
    '1.00'
  ]
}

const optimiserConfig = {
  id: 'optimiser',
  defaultOption: 'SGD',
  options: ['SGD']
}

const lossFunctionConfig = {
  id: 'lossFunction',
  defaultOption: 'Mean Squared Error',
  options: ['Mean Squared Error']
}

class Hyperparameters extends Component {
  updateNumeric (event) {
    const value = parseFloat(event.target.value)
    if (value) {
      this.setState(
        {[event.target.id]: value},
        () => this.props.onChange(this.state)
      )
    }
  }

  handleUpdate (event) {
    this.setState(
      {[event.target.id]: event.target.value},
      () => this.props.onChange(this.state)
    )
  }

  render () {
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
              <InputNumber label='Degree' id={degreeConfig.id} onChange={this.updateNumeric.bind(this)} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={learningRateConfig.options} label='Learning rate' id={learningRateConfig.id} onChange={this.updateNumeric.bind(this)} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={optimiserConfig.options} label='Optimiser' id={optimiserConfig.id} onChange={this.handleUpdate.bind(this)} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={lossFunctionConfig.options} label='Loss function' id={lossFunctionConfig.id} onChange={this.handleUpdate.bind(this)} />
            </Col>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Hyperparameters
