import React, { Component } from 'react'
import {Row, Col, Input, Button, Collapsible, CollapsibleItem, Icon} from 'react-materialize'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='header teal white-text section'>
          <Row className='center'>
            <h1>Polynomial Regressor</h1>
          </Row>
        </div>
        <div className='header'>
          <Row className='z-depth-2 whitte black-text offset-s2 section'>
            <Row>
              <Col offset='s2' s={12}>
                <h5>Hyperparameters</h5>
              </Col>
            </Row>
            <Row>
              <Col offset='s2' s={12}>
                <Input s={2} placeholder='Placeholder' label='Degree' defaultValue='3' />
                <Input s={2} type='select' label='Learning rate' defaultValue='0.25'>
                  <option value='0.01'>0.05</option>
                  <option value='0.1'>0.1</option>
                  <option value='0.25'>0.25</option>
                  <option value='0.5'>0.5</option>
                  <option value='0.75'>0.75</option>
                  <option value='1.0'>0.75</option>
                </Input>
                <Input s={2} type='select' label='Optimiser' defaultValue='0'>
                  <option value='0'>Option 0</option>
                  <option value='1'>Option 1</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Input>
                <Input s={2} type='select' label='Loss function' defaultValue='0'>
                  <option value='0'>Option 0</option>
                  <option value='1'>Option 1</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Input>
              </Col>
            </Row>
          </Row>
        </div>
        <div className='header white black-text'>
          <Row>
            <Col s={3}>
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

            </Col>
            <Col s={6}>
              <Row>
                <h5>Output</h5>
              </Row>
              <Row>
                Chart goes here
              </Row>
            </Col>
            <Col s={3}>
              <Row >
                <h5>Training</h5>
              </Row>
              <div className='card-panel'>
                <Row>
                  <Button waves='light'>Train<Icon right>play_arrow</Icon></Button>
                </Row>
                <Row>
                  Iterations: 1234
                </Row>
                <Row>
                  loss: 0.34
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
