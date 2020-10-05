import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START,
})

export const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    userId: authData.localId,
    idToken: authData.idToken,
})

export const authFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error,
})

export const authLogout = () => ({
    type: actionTypes.AUTH_LOGOUT,
})

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
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            console.log(error);
            dispatch(authFailed(error.response.data.error));
        })
    }
}