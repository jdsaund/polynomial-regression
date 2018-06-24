import React, { Component } from 'react'
import {Row, Col, Input} from 'react-materialize'

class Hyperparameters extends Component {
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
            <Input s={2} placeholder='Placeholder' label='Degree' defaultValue='3' />
            <Input s={2} type='select' label='Learning rate' defaultValue='0.25'>
              <option value='0.01'>0.05</option>
              <option value='0.1'>0.1</option>
              <option value='0.25'>0.25</option>
              <option value='0.5'>0.5</option>
              <option value='0.75'>0.75</option>
              <option value='1.0'>0.75</option>
            </Input>
            <Input s={2} type='select' label='Optimiser' defaultValue='0'>
              <option value='0'>Option 0</option>
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
            </Input>
            <Input s={2} type='select' label='Loss function' defaultValue='0'>
              <option value='0'>Option 0</option>
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
            </Input>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Hyperparameters
