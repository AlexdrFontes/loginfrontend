import * as actionTypes from './actionTypes'

const initialState = {
  loaded: false,
  loggingIn: false,
  token: undefined,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        token: action.result.jwt.token
      }
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      }
    case actionTypes.IDENTIFY_EMAIL:
      return {
        ...state,
        identifyEmail: true,
      }
    case actionTypes.IDENTIFY_EMAIL_SUCCESS:
      return {
        ...state,
        identifyEmail: false,
        detail: action.result.meta.message
      }
    case actionTypes.IDENTIFY_EMAIL_FAIL:
      return {
        ...state,
        identifyEmail: false,
        identifyError: action.error.meta.message
      }
    case actionTypes.RECOVER_PASSWORD:
      return {
        ...state,
        recoverPassword: true,
      }
    case actionTypes.RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverPassword: false,
        token: action.result.jwt.token,
        recoverSucess: action.result.meta.message
      }
    case actionTypes.RECOVER_PASSWORD_FAIL:
      return {
        ...state,
        recoverPassword: false,
        recoverError: action.error.text
      }

    case actionTypes.ACCEPT_INVITATION:
      return {
        ...state,
        acceptingInvitation: true,
      }
    case actionTypes.ACCEPT_INVITATION_SUCCESS:
      return {
        ...state,
        acceptingInvitation: false,
        token: action.result.jwt.token,
      }
    case actionTypes.ACCEPT_INVITATION_FAIL:
      return {
        ...state,
        acceptingInvitation: false,
        acceptInvitationError: action.error.meta.message
      }
    case actionTypes.RESET:
      return initialState
    default:
      return state
  }
}
