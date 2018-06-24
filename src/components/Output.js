import React, { Component } from 'react'
import {Row} from 'react-materialize'

class Output extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coefficients: [],
      fitted: props.fitted
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fitted !== this.props.fitted) {
      this.updateCoefficients(this.props.fitted)
    }
  }

  updateCoefficients (polynomial) {
    if (polynomial) {
      return Promise.all(polynomial.coefficients.map(param => param.data()))
        .then((coeffs) => {
          return this.setState({
            coefficients: coeffs
          })
        })
    }
  }

  render () {
    return (
      <div>
        <Row>
          <h5>Output</h5>
        </Row>
        <Row>
          <ul>
            {this.state.coefficients.map(coeff => {
              return (
                <li>{coeff}</li>
              )
            })}
          </ul>
        </Row>
      </div>
    )
  }
}

export default Output
