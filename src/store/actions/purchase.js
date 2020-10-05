import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
})

export const purchaseBurgerFailed = (error) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    error,
})

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START,
})

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT,
        orderData,
        token,
    }
}

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT,
})
