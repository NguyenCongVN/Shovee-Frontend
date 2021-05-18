import axios from 'axios'

const url = 'http://10.0.2.2:3000/users'

export const getUserDetail = (token) => {
  return {
    type: 'GET_PROFILE',
    payload: axios.get(`${url}/details`, {
      headers: {
           'x-auth-token': token
       }
    })
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

export const updateProfileUser = (token, nama, provinsi, kota, kecamatan, kodepos, alamat) => {
  return {
    type: 'UPDATE_DATA',
    payload: axios.patch(`${url}/details`, {
      name: nama,
      province: provinsi, 
      city: kota, 
      district: kecamatan, 
      full_addrees: alamat, 
      zip_code: kodepos
    }, {
      headers: {
        'x-auth-token': token
      }
    })
  }
}