import checkoutTypes from './checkout.types'

const initialState = {
    isLoading: true,
    isError: false,
    data: [],
}

export default product = (state = initialState, action) => {
    switch(action.type){
        case checkoutTypes.GET_CHECKOUT_PENDING:
        case checkoutTypes.POST_CHECKOUT_PENDING:    
            return {
                ...state,
                isLoading: true
            }

        case checkoutTypes.GET_CHECKOUT_REJECTED:
        case checkoutTypes.POST_CHECKOUT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        
        case checkoutTypes.GET_CHECKOUT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }

        case checkoutTypes.POST_CHECKOUT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: [...state.data, action.payload.data.data]
            }
        default:
            return state   
    }
}