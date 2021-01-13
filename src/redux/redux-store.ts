import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebare: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})
type rootReducerType = typeof rootReducers
export type AppStateType = ReturnType<rootReducerType>

type  PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

// @ts-ignore
const composeEnchancers = window.__REDUX__DEVTOOLS__EXTENSIONS_COMPOSE || compose
let store = createStore(rootReducers, composeEnchancers(applyMiddleware(thunkMiddleWare)))
// @ts-ignore
window.store = store

// @ts-ignore
export default store;