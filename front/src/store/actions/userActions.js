import { push } from "connected-react-router";
import axiosApi from "../../axiosApi";

const { REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } = require("../actionTypes")

const registerSuccess = value => {
    return { type: REGISTER_SUCCESS, value };
};

const registerFailure = error => {
    return { type: REGISTER_FAILURE, error };
};

const loginSuccess = value => {
    return { type: LOGIN_SUCCESS, value };
};

const loginFailure = error => {
    return { type: LOGIN_FAILURE, error };
};

const logoutUser = () => {
    return { type: LOGOUT_USER };
};


export const register = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(registerSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            console.log(error)
            dispatch(registerFailure(error.response.data));
        };
    };
};

export const login = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginFailure(error.response.data));
        };
    };
};

export const logout = () => {
    return async (dispatch, getState) => {
        const token = getState().user.user.token;
        const headers = {
            'Authorization': token,
        };
        await axiosApi.delete("/users/sessions", { headers });
        dispatch(logoutUser());
    }
};

