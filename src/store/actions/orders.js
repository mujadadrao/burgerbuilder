import * as actionTypes from './actionTypes';

export const fetchOrderStart = () => ({
    type: actionTypes.FETCH_ORDERS_START,
})


export const fetchOrderSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
})

export const fetchOrderFailed = (error) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    error,
})

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.INIT_FETCH_ORDERS,
        token,
        userId,
    }
}