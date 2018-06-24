import React, { Component } from 'react'
import { Scatter } from 'react-chartjs-2'

const chartData = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      showLine: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
      data: [
        { x: 65, y: 75 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 56, y: 36 },
        { x: 55, y: 25 },
        { x: 40, y: 18 }
      ]
    },
    {
      label: 'My Second dataset',
      fill: false,
      showLine: true,
      backgroundColor: 'rgba(192,75,192,0.4)',
      pointBorderColor: 'rgba(192,75,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
      data: [
        { x: 75, y: 65 },
        { x: 49, y: 59 },
        { x: 90, y: 80 },
        { x: 29, y: 81 },
        { x: 36, y: 56 },
        { x: 25, y: 55 },
        { x: 18, y: 40 }
      ]
    }
  ]
}

class OutputChart extends Component {
  render () {
    return (
      <div className='chart'>
        <Scatter
          data={chartData}
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
