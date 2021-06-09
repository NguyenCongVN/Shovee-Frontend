import axios from "axios";
import productTypes from './product.types'
const url = "http://10.0.2.2:3000/products";

export const getProductPending = () => {
  return {
    type : productTypes.GET_PRODUCTS_PENDING,
  }
}


export const getProductSuccess = (productsResponse) => {
  return {
    type : productTypes.GET_PRODUCTS_FULFILLED,
    payload : productsResponse
  }
}

export const getProductRejected = () => {
  return {
    type : productTypes.GET_PRODUCTS_REJECTED,
  }
}


export const getMoreProductPending = (page) => {
  return {
    type : productTypes.GET_PRODUCTS_MORE_PENDING,
    payload : page
  }
}


export const getMoreProductSuccess = (productsResponse) => {
  return {
    type : productTypes.GET_PRODUCTS_MORE_FULFILLED,
    payload : productsResponse
  }
}

export const getMoreProductRejected = () => {
  return {
    type : productTypes.GET_PRODUCTS_MORE_REJECTED,
  }
}

export const addProductPending = (data) => {
  return {
    type : productTypes.POST_PRODUCT_PENDING,
    payload : data
  }
}

export const addProductSuccess = (productResponse) => {
  return {
    type : productTypes.POST_PRODUCT_FULFILLED,
    payload : productResponse
  }
}

export const addProductRejected = (errResponse) => {
  return {
    type : productTypes.POST_PRODUCT_REJECTED,
    payload : errResponse
  }
}


export const fetchProductsByUser = (token) => {
  return {
    type: "GET_PRODUCTS_BYUSER",
    payload: axios.get(`${url}/user`, {
      headers: {
        "x-auth-token": token,
      },
    }),
  };
};
