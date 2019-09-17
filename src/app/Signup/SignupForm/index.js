import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

import CustomButton from '../.././shared/buttons/CustomButton'
import InputField from '../.././shared/inputFields/InputField'

class SignupForm extends Component {
  state = {
    email: null,
    password: null,
    passwordConfirm: null,
    name: null,
    emailInputError: false,
    nameInputError: false,
    passwordInputError: false,
    passwordConfirmInputError: false,
  }

  errors = []

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true)
  }

  handleKeyDown = (event) => {
    const { email, password, passwordConfirm, name} = this.state
    const hasEmail = email && email.length > 0
    const hasPassword = password && password.length > 0
    const hasPasswordConfirm =  passwordConfirm && passwordConfirm.length > 0
    const hasName=  name && name.length > 0

    if ((hasEmail || hasPassword || hasPasswordConfirm || hasName) && event.keyCode === 13) {
      this.signup()
    }
  }

  render() {
    return (
      <div className="signup-form-content">
        <div className="col___gb col___gb3">
          <Link to={{ pathname: '/', state: 'user' }}>
          </Link>
          { this.renderForm() }
        </div>
      </div>
    )
  }

  renderForm = () => (
    <div className="signup-form">
      <InputField
        className="input-field"
        onChange={() => {
          this.clearError('email')
          this.clearError('email is invalid')
          this.clearError('email has already been taken')
        }}
        type="text"
        id="email"
        valueContext={this}
        valueName="email"
        placeholder="email"
        required />
      <p className="auth-errors">{this.state.emailInputError}</p>

      <InputField
        className="input-field"
        onChange={() => {
          this.clearError('name')
        }}
        type="text"
        id="name"
        valueContext={this}
        valueName="name"
        placeholder="name"
        required />
      <p className="auth-errors">{this.state.nameInputError}</p>

      <InputField
        className="input-field"
        onChange={() => {
          this.clearError('password')
          if (this.state.passwordConfirmInputError) {
            this.clearError('passwordConfirm')
          }
        }}
        type="password"
        id="password"
        valueContext={this}
        valueName="password"
        placeholder="password"
        required />
      <p className="auth-errors">{this.state.passwordInputError}</p>

      <InputField
        className="input-field"
        onChange={() => this.clearError('passwordConfirm')}
        type="password"
        id="passwordConfirm"
        valueContext={this}
        valueName="passwordConfirm"
        placeholder="confirm password"
        required />
      <p className="auth-errors">{this.state.passwordConfirmInputError}</p>

      { this.renderInputButtons() }
    </div>
  )

  renderInputButtons = () => (
    <div>
      <CustomButton
        text="Register"
        type="filled"
        color="blue"
        width='100%'
        onClick={this.signup} />

      <div className="button-has-account">
        <CustomButton
          text="has account"
          type="empty"
          route="/login"
          width="100%"
          height={8} />
      </div>
    </div>
  )

  clearError = (field) => {
    this.setState({ [`${field}InputError`]: false })
    this.errors = this.errors.filter(e => e !== field)
  }

  fieldError = (field) => {

    if (this.state[field] === null || this.state[field] === false || this.state[field].length === 0) {
      this.setState({ [`${field}InputError`]: 'required' })
      this.errors.push(field)
    } else if (field === 'passwordConfirm' && this.state.passwordConfirm !== this.state.password) {
      this.setState({ passwordConfirmInputError: 'passwords do not match' })
      this.errors.push(field)
    } else {
      return null
    }
  }

  showRequestErrors = (requestErrors) => {
    const errorMessages = requestErrors.meta.message

    Object.keys(errorMessages).forEach((field) => {
      errorMessages[field].forEach((error) => {
        this.errors.push(`${field} ${error}`)
      })
    })

    if (this.errors.includes('email has already been taken')) {
      this.errors.push('email')

      this.setState({ emailInputError: 'email has already been taken'})
    }

    if (this.errors.includes('email is invalid')) {
      this.errors.push('email')

      this.setState({ emailInputError: 'email is invalid'})
    }

    if (this.errors.includes('password is too long (maximum is 128 characters)')) {
      this.errors.push('passwordConfirm')

      this.setState({ passwordConfirmInputError: 'password is too long (maximum is 128 characters)' })
    }

    if (this.errors.includes('password is too short (minimum is 6 characters)')) {

      this.errors.push('passwordConfirm')

      this.setState({ passwordConfirmInputError: 'password is too short (minimum is 6 characters)' })
    }
  }

  allValid = () => {
    const fields = ['email', 'password', 'passwordConfirm', 'name']

    fields.forEach((field) => {
      this.fieldError(field)
    })

    return this.errors.length > 0 ? false : true
  }

  signup = () => {
    const { email, password, name } = this.state

    if (this.allValid()) {
      this.props.signup({ email, password, name }).catch((errors) => {
        this.showRequestErrors(errors)
      })
    }
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
}

export default SignupForm
