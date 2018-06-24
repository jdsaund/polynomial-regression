import React, { Component } from 'react'
import {Row, Col} from 'react-materialize'
import Hyperparameters from './components/Hyperparameters'
import Data from './components/Data'
import Training from './components/Training'
import Output from './components/Output'

class App extends Component {
  train (isTraining) {
    console.log(isTraining)
  }

  render () {
    return (
      <div className='App'>
        <div className='header teal white-text section'>
          <Row className='center'>
            <h1>Polynomial Regressor</h1>
          </Row>
        </div>
        <div className='header'>
          <Hyperparameters onChange={(newParams) => console.log(newParams)} />
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
              <Training onChange={(isTraining) => this.train(isTraining)} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
