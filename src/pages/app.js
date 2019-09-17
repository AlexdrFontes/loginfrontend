import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as authActions } from '../store/reducers/auth'
import { actions as userActions } from '../store/reducers/users'
import { actions as imagesActions } from '../store/reducers/images'

import Routes from '../routes'

import MainNav from '../app/navigation/MainNav'

import './styles.scss'

class App extends Component {
  state = {
    appLoaded: false,
  }

  UNSAFE_componentWillMount() {
    if (this.props.shouldLoadAuth) {
      this.props.loadToken()
      this.props.loadUser()
    }

    setTimeout(() => this.loadBasicData(), 0)
  }

  componentDidUpdate(prevProps) {
    if (this.state.appLoaded && !prevProps.token && this.props.token) {
      this.props.getUser()
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.updateUserSuccess) {
      this.props.getUser()
      this.props.resetUpdateSuccess()

    }

    if (nextProps.fileUploadSuccess) {
      setTimeout( () => {
        this.props.getUser()
        this.props.resetUploadFileSuccess()
      }, 2000)
    }
  }

  render () {
    const { history } = this.props

    return (
      <BrowserRouter>
        <MainNav history={history}  />
        <div className="app-page">
          { this.state.appLoaded ? this.renderPageContainer() : <div>LOADING...</div> }
        </div>
      </BrowserRouter>
    )
  }

  renderPageContainer = () => (
    <div className="app-page-container">
      <Routes />
    </div>
  )

  loadBasicData = () => {
    Promise.all([
      this.props.token && this.props.getUser(),
    ]).then(() => this.setState({ appLoaded: true }))
  }
}

const mapStateToProps = (state, props) => ({
  token: state.auth.token,
  user: state.auth.user,
  updateUserSuccess: state.users.updateSuccess,
  createimagesuccess: state.images.createimagesuccess,
  fileUploadSuccess: state.images.fileUploadSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadToken: authActions.loadToken,
  loadUser: authActions.loadUser,
  getUser: authActions.getUser,
  resetUpdateSuccess: userActions.resetUpdateSuccess,
  resetCreateSuccess: imagesActions.resetCreateSuccess,
  resetUploadFileSuccess: imagesActions.resetUploadFileSuccess,
  shouldLoadAuth: authActions.shouldLoadAuth,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
