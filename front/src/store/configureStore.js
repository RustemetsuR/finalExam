import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from "redux-thunk";
import userReducer from './reducer/userReducer';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import placesReducer from "./reducer/placesReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: userReducer,
    places: placesReducer,
    router: connectRouter(history)
});

const middleWare = [
    thunkMiddleware,
    routerMiddleware(history),
];

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(...middleWare));

store.subscribe(() => {
    saveToLocalStorage({
        user: {
            user: store.getState().user.user
        }
    });
})

export default store;