export const ADD_PRICE = 'ADD_PRICE';
export const REMOVE_PRICE = 'REMOVE_PRICE';

export const addPrice = (amount) => ({
    type: ADD_PRICE,
    amount,
})

export const removePrice = (amount) => ({
    type: REMOVE_PRICE,
    amount,
})
