import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setToken } from '../store/reducers/auth/actions'

import {
  actions as emailAuthActions, selectors as emailAuthSelectors
} from '../store/reducers/emailAuth'

import LoginForm from '../app/Login/LoginForm'

class Login extends Component {
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
    return <LoginForm login={this.login} />
  }

  login = ({ email, password }) => (
    this.props.login(email, password)
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  token: emailAuthSelectors.getToken(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
 login: emailAuthActions.login,
  setToken,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
