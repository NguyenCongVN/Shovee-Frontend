import categoryType from './categories.types'

const intialState = {
    category: [],
    isLoading: false,
    isError: false
}

export default categories = (state = intialState, action) => {
    switch(action.type) {
        case categoryType.GET_CATEGORIES_PENDING:
        case categoryType.PATCH_CATEGORIES_PENDING:
        case categoryType.POST_CATEGORIES_PENDING:
            return {
                ...state,
                isLoading: true
            }

        case categoryType.GET_CATEGORIES_REJECTED:
        case categoryType.POST_CATEGORIES_REJECTED:
        case categoryType.PATCH_CATEGORIES_REJECTED:    
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case categoryType.GET_CATEGORIES_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                category: action.payload.data
            }
        default:
            return state;
    }
}