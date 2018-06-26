import React, { Component } from 'react'
import {Row} from 'react-materialize'
import OutputChart from '../components/OutputChart'
import ChartData from '../model/ChartData'
import DataRasterizer from '../services/Data/DataRasterizer'

class Output extends Component {
  constructor (props) {
    super(props)
    this.trainingChartData = null
    this.fittedChartData = null
    this.state = {
      datasets: [],
      coefficients: []
    }
  }

  componentDidMount () {
    this.updateTrainingInput()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.trainingData !== this.props.trainingData) {
      this.updateTrainingInput()
    }

    if (prevProps.prediction !== this.props.prediction) {
      this.updateTrainingOutput(this.props.trainingData.xs, this.props.prediction)
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

  /**
   * updateTrainingInput - Updates the training input data for charting.
   *
   * @return {Promise} Promise to update the state.
   */
  updateTrainingInput () {
    const data = DataRasterizer.separateAxesToChartData(this.props.trainingData.xs, this.props.trainingData.ys)
    this.trainingChartData = ChartData('Training data', data)
    return this.setState({
      datasets: [this.trainingChartData]
    })
  }

  /**
   * updateTrainingInput - Updates the training output data for charting.
   *
   * @return {Promise} Promise to update the state.
   */
  updateTrainingOutput (xs, ys) {
    const data = DataRasterizer.separateAxesToChartData(xs, ys)

    this.fittedChartData = ChartData('Fitted curve', data, 'red', false)
    const datasets = [this.trainingChartData, this.fittedChartData]
    this.setState({
      datasets: datasets
    })
  }
}

export default Output
