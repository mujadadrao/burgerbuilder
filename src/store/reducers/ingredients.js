import * as ingredientsActions from '../actions/ingredients';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
}

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case ingredientsActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                }
            }
        case ingredientsActions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                }
            }
        default:
            return state;
    }
}

export default ingredients;