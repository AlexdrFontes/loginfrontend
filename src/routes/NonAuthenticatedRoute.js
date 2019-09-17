import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Redirect } from 'react-router-dom'
import { selectors as authSelectors } from '../store/reducers/auth'

class AuthenticatedRoute extends Component {
  render() {
    const { props } = this

    const { component: C, user, ...newProps } = props

    const renderComponent = (routeProps) => {
      if (!user) {
        return <C {...routeProps} />
      } else if (props.path === '/signup' || props.path === '/login') {
        return <Redirect to="/" />
      }
    }
    return <Route {...newProps} render={renderComponent} />
  }
}

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(AuthenticatedRoute)
