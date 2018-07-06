const ChartData = (label, data, colour = 'teal', showLine = false) => {
  return {
    label: label,
    fill: false,
    showLine: showLine,
    backgroundColor: colour,
    pointBorderColor: colour,
    pointBackgroundColor: colour,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: colour,
    pointHoverBorderColor: colour,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: data
  }
}

export default ChartData
