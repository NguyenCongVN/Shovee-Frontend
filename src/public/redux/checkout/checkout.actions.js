import axios from 'axios'
import checkoutTypes from './checkout.types'
const url = 'http://10.0.2.2:3000/checkout'

// export const fetchCheckout= (token) => {
//     return {
//         type: 'GET_CHECKOUT',
//         payload: axios.get(`${url}`, {
//             headers: {
//                 'x-auth-token':token
//             }
//         })
//     }
// }

export const fetchCheckoutPending = (token) => {
    return {
        type: checkoutTypes.GET_CHECKOUT_PENDING,
        payload : token
    }
}


export const fetchCheckoutSuccess = (response) => {
    return {
        type: checkoutTypes.GET_CHECKOUT_FULFILLED,
        payload : response
    }
}


export const fetchCheckoutRejected = (err) => {
    return {
        type: checkoutTypes.GET_CHECKOUT_REJECTED,
        payload : err
    }
}


export const postCheckoutPending = (data, token, playerId) => {
    return {
        type: checkoutTypes.POST_CHECKOUT_PENDING,
        payload : {data, token, playerId}
    }
}


export const postCheckoutSuccess = (response) => {
    return {
        type: checkoutTypes.POST_CHECKOUT_FULFILLED,
        payload : response
    }
}


export const postCheckoutRejected = (err) => {
    return {
        type: checkoutTypes.POST_CHECKOUT_REJECTED,
        payload : err
    }
}

// export const postCheckout = (data, token, playerId) => {
//     return {
//         type: 'POST_CHECKOUT',
//         payload: axios.post(`${url}`, data, {
//             headers: {
//                 'x-auth-token':token
//             },
//             params: {
//                 playerId
//             }
//         })
//     }
// }

export const sendNotificationCheckOut = msg => {
    return {
        type : checkoutTypes.SEND_NOTIFICATION_CHECKOUT,
        payload : msg
    }
}

export const updatePhoneId = id => {
    return {
        type : checkoutTypes.UPDATE_PHONE_ID,
        payload : id
    }
}

export const configOneSignal = () => {
    return {
        type : checkoutTypes.CONFIGURE_ONESIGNAL
    }
}

export const confirmNotification = () => {
    return {
        type : checkoutTypes.CONFIRM_NOTIFICATION
    }
}


export const changePage = (page) => {
    return {
        type: 'PAGE',
        payload: page
    }
}