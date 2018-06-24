import React, { Component } from 'react'
import {Row, Icon, Button} from 'react-materialize'

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
            <Button waves='light' onClick={this.onClick.bind(this)}>
              Train<Icon right>play_arrow</Icon>
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
