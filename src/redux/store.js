import {applyMiddleware, combineReducers, createStore} from "redux";
// import profileReducer from "./profile-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";

let reducers = combineReducers({
    app: appReducer
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));