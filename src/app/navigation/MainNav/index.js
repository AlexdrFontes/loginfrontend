import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  actions as authActions
} from '../../../store/reducers/auth'

import CustomButton from '../.././shared/buttons/CustomButton'

class MainNav extends Component {

  render() {
    const { user } = this.props

    return (
      <div className="main-nav-wrapper">
        <div className="main-nav-content">
          <div className="col___gb col___gb9 top-nav">
            { this.renderNavLeft() }
            { this.renderNavRight(user) }
          </div>
        </div>
      </div>
    )
  }

  renderNavLeft = () => (
    <div className="nav-left">
      <Link to={{ pathname: '/', state: 'user' }}>
        <p> Home </p>
      </Link>
    </div>
  )

  renderNavRight = (user) => (
    <div className="nav-right">
      <div className="nav-user">
        { user
          ? this.renderNavUser(user)
          : [
              <CustomButton
                text="signup/login"
                type="filled"
                route="/login"
                color="white"
                key="login-button" />
            ]
        }
      </div>
    </div>
  )

  renderNavUser = (user) => (
    <div className="nav-user-content">
      <div>
        <Link className="user-info" to={{ pathname: '/user/account', state: 'user' }}>
          <p>{user.name}</p>
        </Link>
      </div>
    </div>
  )
}

MainNav.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  updateSuccess: state.users.updateSuccess,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: authActions.logout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MainNav)
