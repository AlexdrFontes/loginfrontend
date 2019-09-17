import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setToken } from '../store/reducers/auth/actions'

import {
  actions as emailAuthActions, selectors as emailAuthSelectors
} from '../store/reducers/emailAuth'

import SignupForm from '../app/Signup/SignupForm'

class Signup extends Component {
  static defaultProps = {
    token: null
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { setToken } = this.props

    if (this.props.token !== nextProps.token) {
      setToken(nextProps.token)
    }
  }

  render() {
    return <SignupForm signup={this.signup} />
  }

  signup = ({ email, password, name }) => (
    this.props.signup({ email, password, name})
  )
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  token: emailAuthSelectors.getToken(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: emailAuthActions.signup,
  setToken,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
