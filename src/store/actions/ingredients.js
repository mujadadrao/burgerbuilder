export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const addIngredient = (ingredientName) => ({
    type: ADD_INGREDIENT,
    ingredientName,
})

export const removeIngredient = (ingredientName) => ({
    type: REMOVE_INGREDIENT,
    ingredientName,
})
