import * as totalPriceActions from '../actions/totalPrice';

const initialState = {
    totalPrice: 4,
}

const totalPrice = (state = initialState, action) => {
    switch (action.type) {
        case totalPriceActions.ADD_PRICE:
            return {
                ...state,
                totalPrice: state.totalPrice + action.amount,
            }
        case totalPriceActions.REMOVE_PRICE:
            return {
                ...state,
                totalPrice: state.totalPrice - action.amount,
            }
        default:
            return state;
    }
}

export default totalPrice;