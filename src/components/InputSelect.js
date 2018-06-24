import React, { Component } from 'react'
import {Input} from 'react-materialize'

class InputSelect extends Component {
  render () {
    let options = this.props.optionValues.map(value => {
      return <option key={value} value={value}>{value}</option>
    })

    return (
      <Input type='select' label={this.props.label || 'Label'} defaultValue={this.props.defaultValue || this.props.optionValues[0]} onChange={this.props.onChange} id={this.props.id}>
        {options}
      </Input>
    )
  }
}

export default InputSelect
