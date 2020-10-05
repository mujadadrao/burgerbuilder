import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    token: null,
    error: null,
    loading: false,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.idToken,
                userId: action.userId,
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        default:
            return state;
    }
}

export default auth;