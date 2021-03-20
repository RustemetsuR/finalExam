import {DELETE_PLACE_SUCCESS} from "../actionTypes";

const {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER, } = require("../actionTypes");

const initialState = {
    user: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, user: action.value, error: null };
        case REGISTER_FAILURE:
            return { ...state, error: action.error };
        case LOGIN_SUCCESS:
            return { ...state, user: action.value, error: null };
        case LOGIN_FAILURE:
            return { ...state, error: action.error };
        case LOGOUT_USER:
            return { ...state, user: [] };
        default:
            return state;
    };
};

export default userReducer;