import React, { Component } from "react"
import PropTypes from "prop-types"

import CustomButton from '../.././shared/buttons/CustomButton'
import InputField from '../.././shared/inputFields/InputField'

class LoginForm extends Component {
  state = {
    email: null,
    password: null,
    emailInputError: false,
    passwordInputError: false,
  }

  errors = []

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true)
  }

  handleKeyDown = (event) => {
    const { email, password } = this.state
    const hasEmail = email && email.length > 0
    const hasPassword =  password && password.length > 0

    if ((hasEmail || hasPassword) && event.keyCode === 13) {
      this.login()
    }
  }

  render() {
    const { email, emailInputError, password, passwordInputError } = this.state

    return (
      <div className="login-form-content">
        <div className="col___gb col___gb3">
          { this.renderForm(email, emailInputError, password, passwordInputError) }
        </div>
      </div>
    )
  }

  renderForm = (email, emailInputError, password, passwordInputError) => (
    <div className="login-form">
      <form method="post">
        <InputField
          className="input-field"
          onChange={() => {
            this.clearError('email')
            if (passwordInputError === false) {
              this.clearError('password')
              this.errors = []
            }
          }}
          type="text"
          id="email"
          valueContext={this}
          valueName="email"
          placeholder="email"
          required />
        <p className="auth-errors">{emailInputError}</p>

        <InputField
          className="input-field"
          onChange={() => {
            this.clearError('password')
            if (passwordInputError === false) {
              this.errors = []
            }
          }}
          type="password"
          id="password"
          valueContext={this}
          valueName="password"
          placeholder="password"
          current-password=""
          required />
        <p className="auth-errors">{passwordInputError}</p>

        <CustomButton
          text="log in"
          type="filled"
          color="blue"
          width='100%'
          onClick={this.login} />
      </form>

      <div className="button-no-account">
        <CustomButton
          text="create account"
          type="empty"
          color="black"
          route="/signup"
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
    if (this.state[field] === null || this.state[field].length === 0) {
      if (field === 'password') {
        this.setState({ [`${field}InputError`]: 'password is missing' })
      } else if (field === 'email') {
        this.setState({ [`${field}InputError`]: 'email is missing' })
      }
      this.errors.push(field)
    } else {
      return null
    }
  }

  showRequestErrors = (requestErrors) => {
    const errorMessages = requestErrors.error

    this.errors.push(errorMessages)

    if (this.errors.includes('Invalid Email or password.')) {
      this.setState({ passwordInputError: 'Invalid credentials' })
    }
  }

  allValid = () => {
    const fields = ['email', 'password']

    fields.forEach((field) => {
      this.fieldError(field)
    })

    return this.errors.length > 0 ? false : true
  }

  login = () => {
    const { email, password } = this.state

    if (this.allValid()) {
      this.props.login({ email, password }).catch((errors) => {
        this.showRequestErrors(errors)
      })
    }
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
