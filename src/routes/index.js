import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import asyncComponent from './AsyncComponent'
import AuthenticatedRoute from "./AuthenticatedRoute"
import NonAuthenticatedRoute from "./NonAuthenticatedRoute"

const AsyncLogin = asyncComponent(() => import('../pages/login.js'))
const AsyncSignup = asyncComponent(() => import('../pages/signup'))
const AsyncHome = asyncComponent(() => import('../pages/home.js'))
const AsyncAccountUser = asyncComponent(() => import('../pages/account.js'))

const Routes = () => (
  <main style={{minHeight: '100vh'}}>
    <Switch>
      <NonAuthenticatedRoute exact path="/signup" component={AsyncSignup} />
      <NonAuthenticatedRoute exact path="/login" component={AsyncLogin} />
      <AuthenticatedRoute exact path="/user/account" component={AsyncAccountUser} />
      <AuthenticatedRoute exact path="/" component={AsyncHome} />

      <Redirect from="*" to="/" />
    </Switch>
  </main>
)

export default Routes
