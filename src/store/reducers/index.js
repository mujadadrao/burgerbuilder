import ingredients from './ingredients';
import totalPrice from './totalPrice';
import purchase from './purchase';
import orders from './orders';
import {combineReducers} from "redux";

export default combineReducers({
       ings: ingredients,
       price: totalPrice,
       orders: orders,
       purchase: purchase,
});
