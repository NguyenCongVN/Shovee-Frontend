import axios from 'axios'
import cartType from './cart.types'
const url = 'http://10.0.2.2:3000/cart'


export const getCartPending = () =>{
    return {
        type : cartType.GET_CART_PENDING,
    }
} 

export const getCartSuccess = (cartResponse) => {
    return {
        type : cartType.GET_CART_FULFILLED,
        payload : cartResponse
    }
}

export const getCartRejected = () => {
    return {
        type : cartType.GET_CART_REJECTED
    }
}

export const postCart = (id, token) => {
    return {
        type: 'POST_CART',
        payload: axios.post(`${url}`, {
            product: id
        }, {
            headers: {
                'x-auth-token':token
            }
        })
    }
}



export const changePage = (page) => {
    return {
        type: 'PAGE',
        payload: page
    }
}