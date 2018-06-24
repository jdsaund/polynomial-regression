import React, { Component } from 'react'
import { Scatter } from 'react-chartjs-2'

class OutputChart extends Component {
  render () {
    return (
      <div className='chart'>
        <Scatter
          data={{
            labels: ['Scatter'],
            datasets: this.props.datasets
          }}
          options={{
            maintainAspectRatio: false,
            showLine: true,
            scales: {
              xAxes: [{
                display: true,
                labelString: 'x'
              }],
              yAxes: [{
                display: true,
                labelString: 'y'
              }]
            }
          }}
        />
      </div>
    )
  }
}

export default OutputChart
