import * as actionTypes from './actionTypes'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

const cookies = new Cookies()

export function createImage(data) {
  const AuthToken = cookies.get('AuthToken')
  let tokenDecoded, id

  if (AuthToken) {
    tokenDecoded  = jwtDecode(AuthToken)
    id = tokenDecoded.user_id
  }
  let data2 = new FormData()
  data2.append('file[image]', data.file)
  return {
    types: [actionTypes.CREATE_IMAGE, actionTypes.CREATE_IMAGE_SUCCESS, actionTypes.CREATE_IMAGE_FAIL],
    promise: (client) => client.patch(`users/${id}`,
    {
      files: [{
        file: data.file
      }]
    }
    )
  }
}