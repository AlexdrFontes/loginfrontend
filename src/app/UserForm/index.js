import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  actions as authActions
} from '../../store/reducers/auth'

import {
  actions as userActions
} from '../../store/reducers/users'

import { getInfoFormInitialState } from '../shared/utils/user'

import CancelButton from '.././shared/buttons//CancelButton'
import CustomButton from '.././shared/buttons/CustomButton'
import InputField from '.././shared/inputFields/InputField'

class UserForm extends Component {
  state = {
    ...getInfoFormInitialState(this.props.user)
  }

  errors = []

  render() {

    return (
      <div className="user-form-content">
        { this.renderForm() }
      </div>
    )
  }

  renderForm = () => {
    const { user } = this.props

    return (

      <div className="user-form">
        <div className="user-form-header">
          <div className="user-form-header-left-content">
            <h1 className="text-m">Profile</h1>
          </div>
        </div>

        <form method="patch" ref={(el) => this.userInfo = el}>
          <h3 className="text-label">name</h3>
          <InputField
            onChange={(e) => {
              this.clearError('name')
            }}
            type="text"
            id="name"
            valueContext={this}
            valueName="name"
            defaultValue={user.name}
            maxLength="24"
            placeholder="name" />
          <p className="form-errors">{this.state.nameInputError}</p>

          <h3 className="email text-label">email</h3>
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
            defaultValue={this.state.email}
            placeholder="name"/>
          <p className="form-errors">{this.state.emailInputError}</p>

          { this.renderButtons() }
        </form>
      </div>
    )
  }

  handleImageUpload(e) {
    if (e.target.files[0]) {
      const reader = new FileReader()
      const reader2 = new FileReader()
      let file = e.target.files[0]

      reader.readAsDataURL(file)
      reader2.readAsArrayBuffer(file)

      reader2.onload = (event) => {
        this.setState({
          file: event.target.result
        })
      }

      if (this.state.error) {
        this.setState({ error: null })
      }
    }
  }

  renderButtons = () => (
    <div className="buttons">
      <CustomButton
        text="logout"
        type="filled"
        color="red"
        onClick={this.props.logout} />

      <div className="cancel-save">
        <CancelButton onClick={this.onCancelClick} />
      </div>
    </div>
  )

  clearError = (field) => {
    this.setState({ [`${field}InputError`]: false })
    this.errors = this.errors.filter(e => e !== field)
  }

  fieldError = (field) => {
    const { password, passwordConfirm } = this.state

    const fieldDirty = this.state[field] === null && (field !== 'password' && field !== 'passwordConfirm')
    const passwordDirty = password && password.length > 0
    const passwordConfirmDirty = passwordConfirm && passwordConfirm.length > 0
    const passwordMismatch = password !== passwordConfirm

    if (fieldDirty) {
      this.setState({ [`${field}InputError`]:'required' })
      this.errors.push(field)
    } else if (field === 'passwordConfirm' && passwordDirty && !passwordConfirmDirty) {
      this.setState({ passwordConfirmInputError: "password missing" })
      this.errors.push(field)
    } else if (field === 'passwordConfirm' && passwordConfirmDirty && passwordMismatch) {
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
    const fields = ['name', 'email', 'password', 'passwordConfirm']

    fields.forEach((field) => {
      this.fieldError(field)
    })

    return this.errors.length > 0 ? false : true
  }

  deleteAccount = () => {
    const userData = { id: this.props.user.id }
    this.props.destroyUser(userData)
  }

  onCancelClick = () => {
    this.props.history.goBack()
  }

  onSaveClick = () => {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }

    if (this.allValid()) {
      this.props.updateUserDetail(userData).catch((errors) => {
        this.showRequestErrors(errors)
      })
    }
  }
}

UserForm.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  Object: state.users.Object
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: authActions.logout,
  updateUserDetail: userActions.updateUserDetail,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
