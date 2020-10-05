import {delay, put} from 'redux-saga/effects';
import axios from 'axios';
import * as authActions from "../actions/auth"
import {authStart} from "../actions/auth"

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(authActions.authLogoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(authActions.authLogout());
}

export function* authSaga(action) {
    yield put(authStart());
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA-FF3urfLY97Zz1EhfZMP6UR6S6MORg8';
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    if (!action.isSignUp) {
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCA-FF3urfLY97Zz1EhfZMP6UR6S6MORg8'
    }
    try {
        const response = yield axios.post(authUrl, authData);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('expirationDate', yield new Date(new Date().getTime() + response.data.expiresIn * 1000));
        yield put(authActions.authSuccess(response.data.localId, response.data.idToken));
        yield put(authActions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(authActions.authFailed(error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(authActions.authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(authActions.authLogout());
        } else {
            const userId = localStorage.getItem('userId');
            yield put(authActions.authSuccess(userId, token));
            yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}