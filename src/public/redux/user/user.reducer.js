import userTypes from './user.types'

const initialState = {
	isLoading: true,
	isError: false,
}

export default user = (state = initialState, action) => {
	switch (action.type) {
		case userTypes.UPDATE_PROFILE_PENDING:
			return {
				...state,
				isLoading: true,
                isError: false,
			}
		case userTypes.UPDATE_PROFILE_FULFILLED:
			return {
				...state,
				isLoading: false,
				isError: false
			}
		case userTypes.UPDATE_PROFILE_REJECTED:
			return {
				...state,
				isLoading: false,
                isError: true,
			}
		case userTypes.UPDATE_DATA_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }
		case userTypes.GET_PROFILE_PENDING:
			return {
				...state,
				isLoading: true,
			}
		case userTypes.GET_PROFILE_REJECTED:
			return {
				...state,
				isLoading: false,
                isError: true,
			}
		case userTypes.GET_PROFILE_FULFILLED:
			return {
				...state,
				isLoading: false,
				data: action.payload.data.data
			}

		default:
            return state;
	}
}