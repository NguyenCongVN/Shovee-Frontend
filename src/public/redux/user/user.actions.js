import axios from 'axios'
import userTypes from './user.types'
const url = 'http://10.0.2.2:3000/users'

export const getUserDetailStart = (token) => {
  return {
    type : userTypes.GET_PROFILE_PENDING,
    payload : token
  }
}

export const getUserDetailSuccess = (dataResponse) => {
  return {
    type : userTypes.GET_PROFILE_FULFILLED,
    payload : dataResponse
  }
}

export const getUserDetailRejected = () => {
  return {
    type : userTypes.GET_PROFILE_REJECTED,
  }
}


export const updateImage = (token, image) => {
	var data = new FormData()
	data.append('images', {
		uri: image.uri,
		name: image.fileName,
		type: 'image/jpg'
	})
	return {
       type: 'UPDATE_PROFILE',
       payload: axios.patch(`${url}/details`, data, {
           headers: {
               'x-auth-token': token
           }
       })
   }
}

export const updateProfileUserPending = (data) => {
  return {
    type : userTypes.UPDATE_PROFILE_PENDING,
    payload : data
  }
}

export const updateProfileUserSuccess = (userResponse) => {
  return {
    type : userTypes.UPDATE_PROFILE_FULFILLED,
    payload : userResponse
  }
}

export const updateProfileUserRejected = (err) => {
  return {
    type : userTypes.UPDATE_PROFILE_REJECTED,
    payload : err
  }
}