import * as actionTypes from '../actions/actionTypes';

const initialState = {
    purchasedOrders: [],
    loading: false,
    purchased: false,
    error: false,
}

const purchase = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: [...state.purchasedOrders, newOrder],
            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default purchase;