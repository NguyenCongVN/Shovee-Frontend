import axios from 'axios';

const url = 'http://10.0.2.2:3000/wishlist';

export const getWishlist = (token) => {
    return {
        type: 'GET_WISHLIST',
        payload: axios.get(url, {
            headers: {
                'x-auth-token': token
            }
        })
    }
}

export const addWishlist = (token, idProduct) => {
    return {
        type: 'POST_WISHLIST',
        payload: axios.post(url, {
            product: idProduct
        }, {
            headers: {
                'x-auth-token': token
            }
        })
    }
}

export const deleteWishlist = (token, idWishlist) => {
    return {
        type: 'DELETE_WISHLIST',
        payload: axios.delete(url+`/${idWishlist}`, {
            headers: {
                'x-auth-token': token
            }
        })
    }
}