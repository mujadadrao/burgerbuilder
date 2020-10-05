import axios from "../../axios-orders";
import {fetchOrderFailed, fetchOrderStart, fetchOrderSuccess} from "../actions/orders";
import {put} from 'redux-saga/effects';


export function* fetchOrdersSaga(action) {
    yield put(fetchOrderStart());
    try {
        const response = yield axios.get('/orders.json?auth=' + action.token + `&orderBy="userId"&equalTo="${action.userId}"`)
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(fetchOrderSuccess(fetchedOrders));
    } catch (error) {
        yield put(fetchOrderFailed(error));
    }
}