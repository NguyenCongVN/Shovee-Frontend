import checkoutTypes from "./checkout.types";

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  notification_msg: "",
  phoneId: "",
  isOneSignalConfigured: false,
};

export default product = (state = initialState, action) => {
  switch (action.type) {
    case checkoutTypes.GET_CHECKOUT_PENDING:
    case checkoutTypes.POST_CHECKOUT_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case checkoutTypes.GET_CHECKOUT_REJECTED:
    case checkoutTypes.POST_CHECKOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case checkoutTypes.GET_CHECKOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };

    case checkoutTypes.POST_CHECKOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [...state.data, action.payload.data.data],
      };
    case checkoutTypes.SEND_NOTIFICATION_CHECKOUT:
      return {
        ...state,
        notification_msg: action.payload.payload.body,
      };
    case checkoutTypes.UPDATE_PHONE_ID:
      return {
        ...state,
        phoneId: action.payload,
      };
    case checkoutTypes.CONFIGURE_ONESIGNAL:
      return {
        ...state,
        isOneSignalConfigured: true,
      };
    case checkoutTypes.CONFIRM_NOTIFICATION:
      return {
        ...state,
        notification_msg: "",
      };
    default:
      return state;
  }
};
