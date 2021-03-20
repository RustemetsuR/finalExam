import { push } from "connected-react-router";
import axiosApi from "../../axiosApi";
import {DELETE_PLACE_FAILURE, DELETE_PLACE_SUCCESS} from "../actionTypes";

const { GET_PLACES_SUCCESS,
    GET_PLACES_FAILURE,
    GET_SINGLE_PLACE_SUCCESS,
    GET_SINGLE_PLACE_FAILURE,
    ADD_PLACE_FAILURE,
    ADD_PLACE_SUCCESS,
    ADD_PLACE_IMAGE_FAILURE,
    ADD_PLACE_IMAGE_SUCCESS,
    ADD_PLACE_REVIEW_FAILURE,
    ADD_PLACE_REVIEW_SUCCESS} = require("../actionTypes")

const getPlacesSuccess = value => {
    return { type: GET_PLACES_SUCCESS, value };
};

const getPlacesFailure = error => {
    return { type: GET_PLACES_FAILURE, error };
};

const getSinglePlaceSuccess = value => {
    return { type: GET_SINGLE_PLACE_SUCCESS, value };
};

const getSinglePlaceFailure = error => {
    return { type: GET_SINGLE_PLACE_FAILURE, error };
};

const addNewPlaceSuccess = () => {
    return {type: ADD_PLACE_SUCCESS};
};

const addPlaceImageSuccess = () => {
    return {type: ADD_PLACE_IMAGE_SUCCESS};
};

const addPlaceImageFailure = error => {
    return {type: ADD_PLACE_IMAGE_FAILURE, error};
};

const addPlacesReviewSuccess = () => {
    return {type: ADD_PLACE_REVIEW_SUCCESS};
};

const addPlacesReviewFailure = error => {
    return {type: ADD_PLACE_REVIEW_FAILURE, error};
};

export const addNewPlaceFailure = error => {
    return {type: ADD_PLACE_FAILURE, error};
};

export const deletePlaceSuccess = () => {
    return {type: DELETE_PLACE_SUCCESS};
};

export const deletePlaceFailure = () => {
    return {type: DELETE_PLACE_FAILURE};
};


export const fetchGetPlaces = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/places');
            dispatch(getPlacesSuccess(response.data));
        } catch (error) {
            dispatch(getPlacesFailure(error && error));
        };
    };
};

export const fetchGetSinglePlace = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/places/' + id);
            dispatch(getSinglePlaceSuccess(response.data));
        } catch (error) {
            dispatch(getSinglePlaceFailure(error && error));
        };
    };
};

export const fetchAddNewPlace = data => {
    return async (dispatch, getState) => {
        try{
            const token = getState().user.user.token;
            const headers = {'Authorization': token};
            await axiosApi.post("/places", data, {headers});
            dispatch(addNewPlaceSuccess());
            dispatch(push("/"));
        }catch (error){
            dispatch(addNewPlaceFailure(error && error.response.data))
        }
    }
}

export const fetchAddPlaceImage = data => {
    return async (dispatch, getState) => {
        try{
            const token = getState().user.user.token;
            const headers = {'Authorization': token};

            const id = getState().places.singlePlace.place._id;
            await axiosApi.put("/places/" + id + "/newImages", data, {headers});

            dispatch(addPlaceImageSuccess());
            dispatch(fetchGetSinglePlace(id));
        }catch (error){
            dispatch(addPlaceImageFailure(error && error.response.data))
        }
    }
}

export const fetchAddPlaceReview = data => {
    return async (dispatch, getState) => {
        try{
            const token = getState().user.user.token;
            const headers = {'Authorization': token};

            const id = getState().places.singlePlace.place._id;
            await axiosApi.put("/places/" + id + "/newReview", data, {headers});

            dispatch(addPlacesReviewSuccess());
            dispatch(fetchGetSinglePlace(id));
        }catch (error){
            dispatch(addPlacesReviewFailure(error && error))
        }
    }
}

export const fetchDeletePlace = id => {
    return async (dispatch, getState) => {
        try{
            const token = getState().user.user.token;
            const headers = {'Authorization': token};


            await axiosApi.delete("/places/deletePlace/" + id, {headers});
            dispatch(deletePlaceSuccess());
        }catch (error){
            dispatch(deletePlaceFailure(error && error))
        }
    }
}


