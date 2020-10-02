import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrderFailed(error));
            });
    }
}