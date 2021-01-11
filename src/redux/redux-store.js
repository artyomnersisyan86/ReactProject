import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebare: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form:formReducer,
    app:appReducer

})


const composeEnchancers=window.__REDUX__DEVTOOLS__EXTENSIONS_COMPOSE||compose
let store = createStore(reducers,composeEnchancers(applyMiddleware(thunkMiddleWare)))
window.store = store
export default store;