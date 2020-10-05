import * as authSagas from './auth';
import * as ingredientsSagas from './ingredients';
import * as ordersSagas from './orders';
import * as purchaseSagas from './purchase';
import {takeEvery, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSagas.authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authSagas.authCheckStateSaga),
    ])
}

export function* watchIngredients() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, ingredientsSagas.initIngredientsSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.INIT_FETCH_ORDERS, ordersSagas.fetchOrdersSaga);
}

export function* watchPurchase() {
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseSagas.purchaseBurgerSaga);
}
