import productTypes from './product.types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess : false,
    isFetched : false,
    produk: [],
    msg : ''
}

export default product = (state = initialState, action) => {
    switch(action.type){
        case productTypes.GET_PRODUCTS_PENDING:
            return {
                ...state,
                isLoading: true,
                isFetched : false
            }

        case productTypes.GET_PRODUCTS_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case productTypes.GET_PRODUCTS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess : true,
                isFetched : true,
                produk: action.payload.data,
                data: action.payload.data.data
            }
        case productTypes.POST_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess : false,
                isFetched : false
            }

        case productTypes.POST_PRODUCT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess : false,
                isFetched : false,
                msg : action.payload.response.data.msg
            }

        case productTypes.POST_PRODUCT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess : true,
                isFetched : false,
                data: [action.payload.data.data, ...state.data]
            }

        case productTypes.GET_PRODUCTS_MORE_PENDING: // in case when loading get data
            return {
                ...state,
                isLoadingMore: true
            }
        case productTypes.GET_PRODUCTS_MORE_REJECTED: // in case error network/else
            return {
                ...state,
                isLoadingMore: false,
                isError: true
            }
        case productTypes.GET_PRODUCTS_MORE_FULFILLED: // in case successfuly get data
            return {
                ...state,
                isLoadingMore: false,
                isError: false,
                data: [...state.data].concat(action.payload.data.data),
                totalPage: action.payload.data.totalPage,
            }

        case productTypes.GET_PRODUCTS_BYUSER_PENDING:
            return {
                ...state,
                isLoading: true
            }

        case productTypes.GET_PRODUCTS_BYUSER_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case productTypes.GET_PRODUCTS_BYUSER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                produk: action.payload.data,
                datauser: action.payload.data.data
            }

        default:
            return state   
    }
}