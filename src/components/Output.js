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
    this.updateTrainingData()
      .then(() => {
        return this.setState({
          datasets: [this.trainingChartData]
        })
      })
  }

  updateTrainingData () {
    return DataRasterizer.tensorDataToChartData(this.props.trainingData.xs, this.props.trainingData.ys)
      .then(data => {
        this.trainingChartData = ChartData('Training data', data)
      })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.trainingData !== this.props.trainingData) {
      this.updateTrainingData()
        .then(() => {
          return this.setState({
            datasets: [this.trainingChartData]
          })
        })
    }

    if (prevProps.fitted !== this.props.fitted) {
      this.updateTrainingOutput(this.props.fitted)
    }
  }

  updateTrainingOutput (polynomial) {
    if (polynomial) {
      return DataRasterizer.rasterizePolynomial(polynomial)
        .then(data => {
          this.fittedChartData = ChartData('Fitted curve', data, 'red', true)
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
      </div>
    )
  }
}

export default Output
