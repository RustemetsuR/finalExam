const {
    GET_PLACES_SUCCESS,
    GET_PLACES_FAILURE,
    GET_SINGLE_PLACE_SUCCESS,
    GET_SINGLE_PLACE_FAILURE,
    ADD_PLACE_SUCCESS,
    ADD_PLACE_FAILURE,
    ADD_PLACE_IMAGE_FAILURE,
    ADD_PLACE_IMAGE_SUCCESS,
    ADD_PLACE_REVIEW_FAILURE,
    ADD_PLACE_REVIEW_SUCCESS, DELETE_PLACE_FAILURE, DELETE_PLACE_SUCCESS
} = require("../actionTypes");

const initialState = {
    places: [],
    singlePlace: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACES_SUCCESS:
            return {...state, places: action.value, error: null};
        case GET_PLACES_FAILURE:
            return {...state, error: action.error};
        case GET_SINGLE_PLACE_SUCCESS:
            return {...state, singlePlace: action.value, error: null};
        case GET_SINGLE_PLACE_FAILURE:
            return {...state, error: action.error};
        case ADD_PLACE_IMAGE_SUCCESS:
            return {...state, error: null};
        case ADD_PLACE_IMAGE_FAILURE:
            return {...state, error: action.error};
        case ADD_PLACE_SUCCESS:
            return {...state, error: null};
        case ADD_PLACE_FAILURE:
            return {...state, error: action.error};
        case ADD_PLACE_REVIEW_SUCCESS:
            return {...state, error: null};
        case ADD_PLACE_REVIEW_FAILURE:
            return {...state, error: action.error};
        case DELETE_PLACE_SUCCESS:
            return {...state, error: null}
        case DELETE_PLACE_FAILURE:
            return {...state, error: action.error}
        default:
            return state;
    }
};

export default userReducer;