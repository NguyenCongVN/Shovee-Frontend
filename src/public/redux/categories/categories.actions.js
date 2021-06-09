import axios from 'axios';
import categoryType from './categories.types'
const url = 'http://10.0.2.2:3000/categories';

export const getCategoriesPending = () =>{
    return {
        type : categoryType.GET_CATEGORIES_PENDING
    }
} 

export const getCategoriesSuccess = (categoriesResponse) => {
    return {
        type : categoryType.GET_CATEGORIES_FULFILLED,
        payload : categoriesResponse
    }
}

export const getCategoriesRejected = () => {
    return {
        type : categoryType.GET_CATEGORIES_REJECTED
    }
}