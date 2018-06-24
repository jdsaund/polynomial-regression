import React, { Component } from 'react'
import {Row} from 'react-materialize'
import OutputChart from './OutputChart'

import ChartData from '../model/ChartData'
import DataRasterizer from '../services/Data/DataRasterizer'

class Output extends Component {
  constructor (props) {
    super(props)
    this.state = {
      datasets: [],
      coefficients: [],
      fitted: props.fitted
    }
  }

  componentDidMount () {
    return DataRasterizer.tensorDataToChartData(this.props.trainingData.xs, this.props.trainingData.ys)
      .then(data => {
        return this.setState({
          datasets: [ChartData('Training data', data)]
        })
      })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fitted !== this.props.fitted) {
      this.updateCoefficients(this.props.fitted)
    }
  }

  updateCoefficients (polynomial) {
    if (polynomial) {
      return Promise.all(polynomial.coefficients.map(param => param.data()))
        .then((coeffs) => {
          return this.setState({
            coefficients: coeffs
          })
        })
    }
  }

  render () {
    return (
      <div>
        <Row>
          <h5>Output</h5>
        </Row>
        <Row>
          <ul>
            {this.state.coefficients.map((coeff, index) => {
              return (
                <li key={index}>{coeff}</li>
              )
            })}
          </ul>
          <OutputChart datasets={this.state.datasets} />
        </Row>
      </div>
    )
  }
}

export default Output
