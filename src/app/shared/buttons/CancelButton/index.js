import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CancelButton extends Component {
  render() {
    const { onClick } = this.props

    return (
      <button
        className="cancel-button"
        type="button"
        onClick={onClick}>
        <h2 className="button-text">cancel</h2>
      </button>
    )
  }
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CancelButton
