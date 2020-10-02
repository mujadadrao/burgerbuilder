import * as actionTypes from "./actionTypes";

export const addPrice = (amount) => ({
    type: actionTypes.ADD_PRICE,
    amount,
})

export const removePrice = (amount) => ({
    type: actionTypes.REMOVE_PRICE,
    amount,
})

export const resetPrice = () => ({
    type: actionTypes.RESET_PRICE,
})
