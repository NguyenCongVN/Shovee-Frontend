import axios from 'axios';

const url = 'http://10.0.2.2:3000/categories';

export const getCategories = () => {
    axios.get(url).then(response =>{
        console.log(response)
    }).catch(err => console.log(err))
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get(url)
    }
}