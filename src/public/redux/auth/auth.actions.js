import axios from 'axios'
import authTypes from './auth.types'
const url = 'http://10.0.2.2:3000/users'

export const loginStart = (data) => {
    return {
        type: authTypes.LOGIN_PENDING,
        payload: data
    }
}

export const loginSuccess = (dataResponse) => {
    return {
        type : authTypes.LOGIN_FULFILLED,
        payload : dataResponse
    }
}

export const loginRejected = () => {
    return {
        type : authTypes.LOGIN_REJECTED
    }
}


export const registerStart = (data) => {
    return {
        type : authTypes.REGISTER_PENDING,
        payload : data
    }
}


export const registerSuccess = (dataResponse) => {
    return {
        type : authTypes.REGISTER_FULFILLED,
        payload : dataResponse
    }
}

export const registerRejected = () => {
    return {
        type : authTypes.REGISTER_REJECTED
    }
}

export const logoutPending = () => {
    return {
        type: authTypes.LOGOUT_PEDING
    }
}

export const logoutSuccess = () => {
    return {
        type : authTypes.LOGOUT_FULFILLED
    }
}

export const logoutRejected = () => {
    return {
        type : authTypes.LOGOUT_REJECTED,
    }
}

export const confirmBox = () => {
    return {
        type : authTypes.CONFIRM_BOX,
    }
}
export const forgetPassword = (email) => {
    return {
        type: 'FORGET_PASSWORD',
        payload: axios.post(`${url}/forgetpassword`, {
            email: email,
        })
    }
}