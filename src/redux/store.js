import {applyMiddleware, combineReducers, createStore} from "redux";
// import profileReducer from "./profile-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({
    app: appReducer
});

export let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));