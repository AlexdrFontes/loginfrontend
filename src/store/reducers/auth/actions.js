import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

import * as actionTypes from './actionTypes'

const cookies = new Cookies()

export function setToken(token) {
  cookies.set('AuthToken', token, { path: '/' })

  return {
    type: actionTypes.SET_TOKEN,
    result: { data: { token } }
  }
}

export function loadToken() {
  const token = cookies.get('AuthToken')

  return {
    type: actionTypes.LOAD_TOKEN,
    result: { data: { token } }
  }
}

export function loadUser() {
  return {
    type: actionTypes.LOAD_USER
  }
}

export function getUser() {
  const AuthToken = cookies.get('AuthToken')
  let tokenDecoded, id

  if (AuthToken) {
    tokenDecoded  = jwtDecode(AuthToken)
    id = tokenDecoded.user_id
  }

  return {
    types: [actionTypes.GET_USER, actionTypes.GET_USER_SUCCESS, actionTypes.GET_USER_FAIL],
    promise: (client) => client.get(`users/${id}`)
  }
}

export function destroyUser(userData) {
  return {
    types: [actionTypes.DESTROY_USER, actionTypes.DESTROY_USER_SUCCESS, actionTypes.DESTROY_USER_FAIL],
    promise: (client) => client.delete(`users/${userData.id}`, {
      data: {
        user: userData
      }
    })
  }
}

export function logout() {
  cookies.remove('AuthToken', { path: '/' })
  cookies.remove('UserData', { path: '/' })
  return {
    type: actionTypes.LOGOUT
  }
}

export function shouldLoadAuth(globalState) {
  const AuthToken = cookies.get(globalState.auth, 'AuthToken')

  return AuthToken && !globalState.auth.user
}
