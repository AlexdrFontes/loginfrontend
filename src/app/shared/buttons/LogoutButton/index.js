import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LogoutButton extends Component {
  render() {
    const { onClick } = this.props

    return (
      <div className="logout-button" onClick={onClick}>
        <p className="button-text">logout</p>
      </div>
    )
  }
}

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default LogoutButton
