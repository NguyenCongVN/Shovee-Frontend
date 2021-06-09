import { AsyncStorage } from 'react-native'
import wishlistTypes from './wishlist.types'
const initialState = {
    data: {
        data: []
    },
    isLoading: false,
    isError: false,
    isLiked: false,
}

export default wishlist = (state = initialState, action) => {
    switch(action.type) {
        case wishlistTypes.GET_WISHLIST_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case wishlistTypes.GET_WISHLIST_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case wishlistTypes.GET_WISHLIST_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLiked: false,
                data: action.payload.data
            }
        case wishlistTypes.POST_WISHLIST_PENDING:
            return {
                ...state,
                isLoading: true,
                isLiked: false,
            }
        case wishlistTypes.POST_WISHLIST_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isLiked: false,
            }
        case wishlistTypes.POST_WISHLIST_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLiked: true,
                data: [action.payload.data.data].concat(state.data.data)
            }
        case wishlistTypes.DELETE_WISHLIST_PENDING:
                return {
                    ...state,
                    isLoading: true,
                    isLiked: false,
                }
        case wishlistTypes.DELETE_WISHLIST_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isLiked: false,
            }
        case wishlistTypes.DELETE_WISHLIST_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLiked: true,
                data: {
                    data: state.data.data.filter(wishlist => action.payload.data._id != wishlist._id)
                }
            }
        default: 
            return state
    }
}