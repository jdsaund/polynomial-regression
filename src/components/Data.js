import React, { Component } from 'react'
import {Row, Collapsible, CollapsibleItem, Button} from 'react-materialize'
import InputNumber from './InputNumber'

class Data extends Component {
  updateDegree (event) {
    const value = parseInt(event.target.value)
    if (value) {
      this.setState(
        {'degree': value},
        () => this.props.onChange(this.state)
      )
    }
  }

  render () {
    return (
      <div>
        <Row >
          <h5>Data</h5>
        </Row>
        <Row>
          <Collapsible accordion defaultActiveKey={0}>
            <CollapsibleItem header='Generate data' icon='cached'>
              <Row>
                <InputNumber label='Degree' onChange={this.updateDegree.bind(this)} defaultValue={3} />
              </Row>
              <Row>
                <Button waves='light' onClick={this.props.startGenerate}>Generate</Button>
              </Row>
            </CollapsibleItem>
            <CollapsibleItem header='Upload .csv' icon='cloud_upload'>
              Lorem ipsum dolor sit amet.
            </CollapsibleItem>
          </Collapsible>
        </Row>
      </div>
    )
  }
}

export default Data
