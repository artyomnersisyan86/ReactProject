import {AppStateType} from "./redux-store";


export const getIsAuthSelector = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getLoginSelector = (state: AppStateType) => {
    return state.auth.login
}