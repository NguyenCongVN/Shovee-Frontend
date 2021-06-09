import axios from 'axios';
import wishlistTypes from './wishlist.types'
const url = 'http://10.0.2.2:3000/wishlist';

export const getWishListPending = (token) => {
    return {
        type : wishlistTypes.GET_WISHLIST_PENDING,
        payload : token
    }
}

export const getWishListSuccess = (wishlistResponse) => {
    return {
        type : wishlistTypes.GET_WISHLIST_FULFILLED,
        payload : wishlistResponse
    }
}

export const getWishListRejected = (error) => {
    return {
        type : wishlistTypes.GET_WISHLIST_REJECTED,
        payload : error
    }
}


export const addWishListPending = (token, idProduct) => {
    return {
        type : wishlistTypes.POST_WISHLIST_PENDING,
        payload : {token, idProduct}
    }
}

export const addWishListSuccess = (wishlistResponse) => {
    return {
        type : wishlistTypes.POST_WISHLIST_FULFILLED,
        payload : wishlistResponse
    }
}

export const addWishListRejected = (error) => {
    return {
        type : wishlistTypes.POST_WISHLIST_REJECTED,
        payload : error
    }
}


export const deleteWishListPending = (token, idWishlist) => {
    return {
        type : wishlistTypes.DELETE_WISHLIST_PENDING,
        payload : {token, idWishlist}
    }
}

export const deleteWishListSuccess = (wishlistResponse) => {
    return {
        type : wishlistTypes.DELETE_WISHLIST_FULFILLED,
        payload : wishlistResponse
    }
}

export const deleteWishListRejected = (error) => {
    return {
        type : wishlistTypes.DELETE_WISHLIST_REJECTED,
        payload : error
    }
}