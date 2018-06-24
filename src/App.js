import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import Hyperparameters from './components/Hyperparameters'
import Data from './components/Data'
import Training from './components/Training'
import Output from './components/Output'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='header teal white-text section'>
          <Row className='center'>
            <h1>Polynomial Regressor</h1>
          </Row>
        </div>
        <div className='header'>
          <Hyperparameters />
        </div>
        <div className='header white black-text'>
          <Row>
            <Col s={3}>
              <Data />
            </Col>
            <Col s={6}>
              <Output />
            </Col>
            <Col s={3}>
              <Training />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
