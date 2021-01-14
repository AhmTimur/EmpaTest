import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {usersReducer} from "./users-reducer";

let rootReducer = combineReducers({
    auth: authReducer,
    usersPage: usersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store