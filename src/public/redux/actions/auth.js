import axios from 'axios'

const url = 'http://10.0.2.2:3000/users'

export const isLogin = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`${url}/authenticate`, {
            user: data.username,
            password: data.password,
        })
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`${url}/register`, data)
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