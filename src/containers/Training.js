import React, { Component } from 'react'
import { Row, Button } from 'react-materialize'

class Training extends Component {
  onClick (event) {
    this.props.onChange()
  }

  render () {
    return (
      <div>
        <Row >
          <h5>Training</h5>
        </Row>
        <div className='card-panel'>
          <Row>
            <Button waves='light' onClick={this.onClick.bind(this)} className={this.props.isTraining ? 'red' : 'teal'}>
              {this.props.isTraining ? 'Stop' : 'Train'}
            </Button>
          </Row>
        </div>
      </div>
    )
  }
}

export default Training
