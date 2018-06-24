import React, { Component } from 'react'
import {Row, Input, Collapsible, CollapsibleItem, Button} from 'react-materialize'

class Data extends Component {
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
                <Input placeholder='Placeholder' label='Degree' defaultValue='3' />
              </Row>
              <Row>
                <Input placeholder='Placeholder' label='Sigma' defaultValue='1.0' />
              </Row>
              <Row>
                <Button waves='light'>Generate</Button>
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
