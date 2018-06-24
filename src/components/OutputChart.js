import React from 'react'
import { Scatter } from 'react-chartjs-2'

const OutputChart = (props) => {
  return (
    <div className='chart'>
      <Scatter
        data={{
          labels: ['Scatter'],
          datasets: props.datasets
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
        height={400}
      />
    </div>
  )
}

export default OutputChart
