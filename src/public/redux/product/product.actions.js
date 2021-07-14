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


export const fetchProductByUserPending = (token) => {
  return {
    type : productTypes.GET_PRODUCTS_BYUSER_PENDING,
    payload : token
  }
}

export const fetchProductByUserSuccess = (productResponse) => {
  return {
    type : productTypes.GET_PRODUCTS_BYUSER_FULFILLED,
    payload : productResponse
  }
}

export const fetchProductByUserRejected = (errResponse) => {
  return {
    type : productTypes.GET_PRODUCTS_BYUSER_REJECTED,
    payload : errResponse
  }
}