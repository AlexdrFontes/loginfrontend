import * as actionTypes from './actionTypes'

const initialState = {
  presignObject: null,
  detail: null,
  createImageSuccess: false,
  fileUploading: false,
  fileUploadSuccess: false,
  imageCreating: false,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.CREATE_IMAGE:
      return {
        ...state,
        imageCreating: true,
      }
    case actionTypes.CREATE_IMAGE_SUCCESS:
      return {
        ...state,
        imageCreating: false,
        createImageSuccess: true,
        presignObject: action.result.meta.presign_object
      }
    case actionTypes.CREATE_IMAGE_FAIL:
      return {
        ...state,
        imageCreating: false,
        error: action.error,
        createImageSuccess: false,
      }
    case actionTypes.CREATE_SUCCESS_RESET:
      return {
        ...state,
        createImageSuccess: false,
        error: null,
      }
    case actionTypes.UPLOAD_FILE:
      return {
        ...state,
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
        ...state,
        fileUploadSuccess: false,
      }
    case actionTypes.RESET: {
      return initialState
    }

    default:
      return state
  }
}
