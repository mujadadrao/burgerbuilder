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
    return {
        type: actionTypes.AUTH_INIT_LOGOUT,
    }
}

export const authLogoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime,
    }
}

export const authUser = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignUp,
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path,
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    }
}