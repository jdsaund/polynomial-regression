import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import InputSelect from './InputSelect'
import InputNumber from './InputNumber'
import Defaults from '../config/Defaults'
import Optimizers from '../config/Optimizers'

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
              <InputNumber label='Degree' id={'degree'} onChange={this.updateNumeric.bind(this)} defaultValue={Defaults.degree} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={['0.05', '0.10', '0.25', '0.50', '0.75', '1.00']} label='Learning rate' id={'learningRate'} onChange={this.updateNumeric.bind(this)} defaultValue={Defaults.learningRate} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={['50', '100', '250', '500', '1000', '2000']} label='Iterations' id={'numIterations'} onChange={this.handleUpdate.bind(this)} defaultValue={Defaults.numIterations} />
            </Col>
            <Col s={2}>
              <InputSelect optionValues={Object.keys(Optimizers)} label='Optimiser' id={'optimiser'} onChange={this.handleUpdate.bind(this)} defaultOption={Defaults.optimizer} />
            </Col>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Hyperparameters
