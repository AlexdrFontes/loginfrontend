import * as actionTypes from './actionTypes'

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function signup(userData) {
  return {
    types: [actionTypes.LOGIN, actionTypes.LOGIN_SUCCESS, actionTypes.LOGIN_FAIL],
    promise: (client) => client.post('users', {
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name
      }
    })
  }
}

export function login(email, password) {
  return {
    types: [actionTypes.LOGIN, actionTypes.LOGIN_SUCCESS, actionTypes.LOGIN_FAIL],
    promise: (client) => client.post('users/sign_in', {
      data: {
        user: {
          email: email,
          password: password
        }
      }
    })
  }
}

