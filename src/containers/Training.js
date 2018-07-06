import React, { Component } from 'react'
import { Row, Button, ProgressBar } from 'react-materialize'

class Training extends Component {
  onClick (event) {
    this.props.onChange()
  }

  progress () {
    if (this.props.isTraining) {
      return (
        <div>
          <Row> Iteration {this.props.currentIteration} /  {this.props.totalIterations} </Row>
          <Row> <ProgressBar progress={100 * this.props.currentIteration / this.props.totalIterations} /> </Row>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <Row>
          <h5>Training</h5>
        </Row>
        <div className='card-panel'>
          <Row>
            <Button waves='light' onClick={this.onClick.bind(this)} className={this.props.isTraining ? 'red' : 'teal'}>
              {this.props.isTraining ? 'Stop' : 'Train'}
            </Button>
          </Row>
          {this.progress()}
        </div>
      </div>
    )
  }
}

export default Training
