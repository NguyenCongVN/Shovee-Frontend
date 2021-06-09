import cartTypes from './cart.types'

const initialState = {
    isLoading: true,
    isError: false,
    data: [],
    page: 'Me'
}

export default product = (state = initialState, action) => {
    switch(action.type){
        case cartTypes.GET_CART_PENDING:
        case cartTypes.POST_CART_PENDING:    
            return {
                ...state,
                isLoading: true
            }

        case cartTypes.GET_CART_REJECTED:
        case cartTypes.POST_CART_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        
        case cartTypes.GET_CART_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }

        case cartTypes.POST_CART_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: [...state.data, action.payload.data.data]
            }
		case cartTypes.PAGE:
			return {
				...state,
				page: action.payload
			}
        default:
            return state   
    }
}