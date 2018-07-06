import React, { Component } from 'react'
import {Row} from 'react-materialize'
import OutputChart from '../components/OutputChart'
import ChartData from '../model/ChartData'

class Output extends Component {
  render () {
    const datasets = [ChartData('Training data', this.props.trainingData)]

    if (this.props.fittedData) {
      datasets.push(ChartData('Fitted curve', this.props.fittedData, 'red', true))
    }

    return (
      <div>
        <Row>
          <h5>Output</h5>
        </Row>
        <Row>
          <OutputChart datasets={datasets} />
        </Row>
      </div>
    )
  }
}

export default Output
