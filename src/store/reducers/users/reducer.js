import Cookies from 'universal-cookie'

import * as actionTypes from './actionTypes'

const cookies = new Cookies()

const initialState = {
  Object: null,
  detail: null,
  updateSuccess: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.UPDATE_DETAIL:
      return {
        ...state,
        detailUpdating: true,
      }
    case actionTypes.UPDATE_DETAIL_SUCCESS:
      cookies.set('UserData', action.result.user, { path: '/' })
      cookies.remove('AuthToken', { path: '/' })
      cookies.set('AuthToken', action.result.meta.jwt.token, { path: '/' })
      return {
        ...state,
        detailUpdating: false,
        detail: action.result.user,
        updateSuccess: true,
        Object: action.result.meta.object
      }
    case actionTypes.UPDATE_DETAIL_FAIL:
      return {
        ...state,
        detailUpdating: false,
        error: action.error,
        updateSuccess: false,
      }
    case actionTypes.UPDATE_SUCCESS_RESET:
      return {
        ...state,
        updateSuccess: false,
        error: null,
      }
    case actionTypes.LOAD_DETAIL:
      return {
        ...state,
        detailLoading: true,
      }
    case actionTypes.LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detail: action.result.user
      }

    case actionTypes.LOAD_DETAIL_FAIL:
      return {
        ...state,
        detailLoading: false,
        error: action.error
      }
    case actionTypes.UPLOAD_FILE:
        return {
          fileUploading: true,
        }
      case actionTypes.UPLOAD_FILE_SUCCESS:
        return {
          fileUploading: false,
          fileUploadSuccess: true,
        }
      case actionTypes.UPLOAD_FILE_FAIL:
        return {
          fileUploading: false,
          error: action.error,
          fileUploadSuccess: false,
        }
      case actionTypes.UPLOAD_FILE_SUCCESS_RESET:
        return {
          fileUploadSuccess: false,
          error: null,
        }
    case actionTypes.RESET: {
      return initialState
    }

    default:
      return state
  }
}
