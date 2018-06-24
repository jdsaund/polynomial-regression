import React, { Component } from 'react'
import {Row, Icon, Button} from 'react-materialize'

class Training extends Component {
  constructor (props) {
    super(props)
    this.state = { isTraining: false }
  }

  onClick (event) {
    this.setState({isTraining: !this.state.isTraining})

    this.props.onChange(this.state.isTraining)
  }

  render () {
    return (
      <div>
        <Row >
          <h5>Training</h5>
        </Row>
        <div className='card-panel'>
          <Row>
            <Button waves='light' onClick={this.onClick.bind(this)}>
              {this.state.isTraining || false ? 'Training' : 'Train'}<Icon right>{this.state.isTraining || false ? 'stop' : 'play_arrow'}</Icon>
            </Button>
          </Row>
          <Row>
            Iterations: 1234
          </Row>
          <Row>
            loss: 0.34
          </Row>
        </div>
      </div>
    )
  }
}

export default Training
