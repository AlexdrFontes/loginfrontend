import Cookies from 'universal-cookie'

import * as actionTypes from './actionTypes'

const cookies = new Cookies()

const initialState = {
  token: null,
  loading: false,
  loaded: false,
  user: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.result.data.token
      }
    case actionTypes.LOAD_TOKEN:
      return {
        ...state,
        token: action.result.data.token
      }
    case actionTypes.LOAD_USER:
      const UserData = cookies.get('UserData')
      return {
        ...state,
        user: UserData
      }
    case actionTypes.LOGOUT:
      return initialState
    case actionTypes.GET_USER:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case actionTypes.GET_USER_SUCCESS:
      cookies.set('UserData', action.result.user, { path: '/' })
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user
      }
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }

    case actionTypes.DESTROY_USER:
      return {
        ...state,
        loading: true,
        loaded: false
      }

    case actionTypes.DESTROY_USER_SUCCESS:
      cookies.remove('AuthToken', { path: '/' })
      cookies.remove('UserData', { path: '/' })
      return initialState

    case actionTypes.DESTROY_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }

    case actionTypes.RESET: {
      return initialState
    }
    default:
      return state
  }
}
