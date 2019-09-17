import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InputField extends Component {
  render() {
    const { valueContext, valueName, valueChangeCallback, ...inputProps } = this.props

    return (
      <input {...inputProps} onChange={this.updateValue} />
    )
  }

  updateValue = (event) => {
    const { onChange, type, valueContext, valueName, valueChangeCallback } = this.props

    const value = type === 'checkbox' ? event.target.checked : event.target.value

    if (valueChangeCallback) {
      valueChangeCallback(valueName, value)
    } else {
      valueContext.setState({ [valueName]: value })
    }

    valueContext.setState({ [valueName]: value })

    if (onChange) {
      onChange(event)
    }
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  valueChangeCallback: PropTypes.func,
  valueContext: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired
}
