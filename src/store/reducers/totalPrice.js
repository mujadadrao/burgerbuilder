import * as actionTypes from "../actions/actionTypes";

const BASE_PRICE = 4;

const initialState = {
    totalPrice: BASE_PRICE,
}

const totalPrice = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRICE:
            return {
                ...state,
                totalPrice: state.totalPrice + action.amount,
            }
        case actionTypes.REMOVE_PRICE:
            return {
                ...state,
                totalPrice: state.totalPrice - action.amount,
            }
        case actionTypes.RESET_PRICE:
            return {
                ...state,
                totalPrice: BASE_PRICE,
            }
        default:
            return state;
    }
}

export default totalPrice;
