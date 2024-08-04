import { error } from 'console';
import { AuthAction, AuthActionTypes } from '../actions';
import { AuthenticationModel } from '../models/user.model';

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
};

const initialState: AuthenticationModel = {
    username: '',
    password: '',
    loading: false,
    error: ''
};

export function authReducer(
    state: AuthenticationModel = initialState,
    action: AuthAction
) {
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATED:
            const user = action.payload;
            return {
                ...user
            };
        case AuthActionTypes.NOT_AUTHENTICATED:
            return {
                username: '',
                password: '',
                token: '',
                loading: false,
                error: ''
            };
        case AuthActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case AuthActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}
