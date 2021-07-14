import cartType from "./cart.types";
const url = "http://10.0.2.2:3000/cart";

export const getCartPending = () => {
  return {
    type: cartType.GET_CART_PENDING,
  };
};

export const getCartSuccess = (cartResponse) => {
  return {
    type: cartType.GET_CART_FULFILLED,
    payload: cartResponse,
  };
};

export const getCartRejected = () => {
  return {
    type: cartType.GET_CART_REJECTED,
  };
};

export const postCartPending = (id, token) => {
  return {
    type: cartType.POST_CART_PENDING,
    payload : {id, token}
  };
};

export const postCartSuccess = (cartResponse) => {
  return {
    type: cartType.POST_CART_FULFILLED,
    payload: cartResponse,
  };
};

export const postCartRejected = () => {
  return {
    type: cartType.POST_CART_REJECTED,
  };
};


export const deleteCartPending = (id, token , wantDecrease) => {
  return {
    type: cartType.DELETE_CART_PENDING,
    payload : {id, token , wantDecrease}
  };
};

export const deleteCartSuccess = (cartResponse) => {
  return {
    type: cartType.DELETE_CART_FULFILLED,
    payload: cartResponse,
  };
};

export const deleteCartRejected = () => {
  return {
    type: cartType.DELETE_CART_REJECTED,
  };
};

export const changePage = (page) => {
  return {
    type: cartType.PAGE,
    payload: page,
  };
};
