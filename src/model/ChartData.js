const ChartData = (label, data, colour = 'teal', showLine = true) => {
  return {
    label: label,
    fill: false,
    showLine: false,
    backgroundColor: `${colour} lighten-3`,
    pointBorderColor: colour,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: colour,
    pointHoverBorderColor: `${colour} darken-3`,
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10,
    data: data
  }
}

export default ChartData
