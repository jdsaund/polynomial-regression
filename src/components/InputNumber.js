import React, { Component } from 'react'
import {Input} from 'react-materialize'

class InputNumber extends Component {
  render () {
    return (
      <Input placeholder='A number'
        defaultValue={this.props.defaultValue || '0'}
        id={this.props.id}
        label={this.props.label || 'Label'}
        type='number'
        className='validate'
        onChange={this.props.onChange}
        min='0' />
    )
  }
}

export default InputNumber
