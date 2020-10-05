import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START,
})

export const authSuccess = (userId, token) => ({
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: token,
})

export const authFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error,
})

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
    type: actionTypes.AUTH_LOGOUT,
}}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA-FF3urfLY97Zz1EhfZMP6UR6S6MORg8';
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        if (!isSignUp){
            authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCA-FF3urfLY97Zz1EhfZMP6UR6S6MORg8'
        }
        axios.post(authUrl, authData).then(response => {
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
            dispatch(authSuccess(response.data.localId, response.data.idToken));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFailed(error.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path,
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(authLogout());
            } else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId, token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}