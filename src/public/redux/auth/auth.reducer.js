import authTypes from "./auth.types";
const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  token: "",
  isLogin: false,
  isSuccess: false,
};

export default auth = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLogin: false,
      };
    case authTypes.LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        token: action.payload.data.token,
        data: action.payload.data.data,
      };
    case authTypes.LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLogin: false,
      };
    case authTypes.FORGET_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case authTypes.FORGET_PASSWORD_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case authTypes.FORGET_PASSWORD_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case authTypes.REGISTER_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case authTypes.REGISTER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case authTypes.REGISTER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case authTypes.CONFIRM_BOX:
      return {
        ...state,
        isError: false,
        isSuccess: false,
      };
    case authTypes.LOGOUT_PEDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case authTypes.LOGOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        isLogin : false
      };
    case authTypes.LOGOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};
