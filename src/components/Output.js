import React, { Component } from 'react'
import {Row} from 'react-materialize'

class Output extends Component {
  render () {
    return (
      <div>
        <Row>
          <h5>Output</h5>
        </Row>
        <Row>
          Chart goes here
        </Row>
      </div>
    )
  }
}

export default Output
