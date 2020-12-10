import { authAPI, captchaAPI, } from "../api/api";
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = "project/app/SET_USER_DATA";
const SET_CAPTCHA_SUCCESS = "project/app/SET_CAPTCHA_SUCCESS";
let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captcha: null
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
};
const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
const getCaptchaSuccess = (captcha) => ({type: SET_CAPTCHA_SUCCESS, payload: {captcha}})

export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.me();
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}
export const loginThunk = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
            dispatch(stopSubmit("Login", {_error: messages}))
        }
    }
}
export const getCaptcha = () => {

    return async (dispatch) => {
        const response = await captchaAPI.captcha()
        const capthaUrl=response.data.url
        dispatch(getCaptchaSuccess(capthaUrl))
    }
}
export const logoutThunk = () => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
export default authReducer;