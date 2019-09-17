import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserForm from '../app/UserForm/'

class Account extends Component {
  render() {
    return (
      <UserForm history={this.props.history} />
    )
  }
}

Account.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}

export default Account
