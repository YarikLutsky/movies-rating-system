import { Dispatch } from 'redux';
import authApi from '../apis/auth';
import { AuthActionTypes } from './types';
import { AuthenticationModel } from '../models/user.model';

export interface setUserAction {
    type: AuthActionTypes.AUTHENTICATED;
    payload: AuthenticationModel;
}

export interface removeUserAction {
    type: AuthActionTypes.NOT_AUTHENTICATED;
}

export interface setError {
    type: AuthActionTypes.SET_ERROR;
    payload: string;
}

export interface setloading {
    type: AuthActionTypes.SET_LOADING;
    payload: boolean;
}

export type AuthAction =
    | setUserAction
    | removeUserAction
    | setError
    | setloading;

export const login = (authData: AuthenticationModel, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            setAuthLoading(true);
            const response = await authApi.post('/', authData);
            setAuthLoading(false);
            if (response.status === 200) {
                callback(true);
                setToken(response?.data?.token);
                dispatch(setUser(response?.data?.token));
            } else {
                callback(false);
            }
        } catch (error) {
            setAuthError(JSON.stringify(error));
            console.log(error);
            setAuthLoading(false);
            callback(false);
        }
    };
};

export const logout = () => {
    return {
        type: AuthActionTypes.NOT_AUTHENTICATED
    };
};

const setUser = (accessToken: string) => {
    return {
        type: AuthActionTypes.AUTHENTICATED,
        payload: {
            password: '',
            username: '',
            token: accessToken
        }
    };
};

const setAuthError = (error: string) => {
    return {
        type: AuthActionTypes.SET_ERROR,
        payload: error
    };
};

const setAuthLoading = (isLoading: boolean) => {
    return {
        type: AuthActionTypes.SET_LOADING,
        payload: isLoading
    };
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};
