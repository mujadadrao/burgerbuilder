import ingredients from './ingredients';
import totalPrice from './totalPrice';
import {combineReducers} from "redux";

export default combineReducers({
       ings: ingredients,
       price: totalPrice,
});
