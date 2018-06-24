import React, { Component } from 'react'
import {Row} from 'react-materialize'
import OutputChart from './OutputChart'

import ChartData from '../model/ChartData'
import DataRasterizer from '../services/Data/DataRasterizer'

class Output extends Component {
  constructor (props) {
    super(props)
    this.trainingChartData = null
    this.fittedChartData = null
    this.state = {
      datasets: [],
      coefficients: [],
      fitted: props.fitted
    }
  }

  componentDidMount () {
    return DataRasterizer.tensorDataToChartData(this.props.trainingData.xs, this.props.trainingData.ys)
      .then(data => {
        this.trainingChartData = ChartData('Training data', data)
        return this.setState({
          datasets: [this.trainingChartData]
        })
      })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fitted !== this.props.fitted) {
      this.updateCoefficients(this.props.fitted)
      this.updateTrainingOutput(this.props.fitted)
    }
  }

  updateCoefficients (polynomial) {
    if (polynomial) {
      return Promise.all(polynomial.coefficients.map(param => param.data()))
        .then(coeffs => {
          return this.setState({
            coefficients: coeffs
          })
        })
    }
  }

  updateTrainingOutput (polynomial) {
    if (polynomial) {
      return DataRasterizer.rasterizePolynomial(polynomial)
        .then(data => {
          this.fittedChartData = ChartData('Fitted curve', data, 'pink', true)
          const datasets = [this.fittedChartData, this.trainingChartData]
          return this.setState({
            datasets: datasets
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
          <OutputChart datasets={this.state.datasets} />
        </Row>
        <Row>
          <ul>
            {this.state.coefficients.map((coeff, index) => {
              return (
                <li key={index}>{coeff}</li>
              )
            })}
          </ul>
        </Row>
      </div>
    )
  }
}

export default Output
