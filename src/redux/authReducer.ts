import {authAPI, captchaAPI,} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = "project/app/SET_USER_DATA";
const SET_CAPTCHA_SUCCESS = "project/app/SET_CAPTCHA_SUCCESS";
type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: Boolean,
    isAuth: Boolean,
    captcha: string | null
}
let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captcha: null
};
const authReducer = (state = initialState, action: any): initialStateType => {
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

type setAuthUserDataPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataPayloadType

}

const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
})

type getCaptchaSuccessType = {
    type: typeof SET_CAPTCHA_SUCCESS
    payload: { captcha: string }
}

const getCaptchaSuccess = (captcha: string): getCaptchaSuccessType => ({type: SET_CAPTCHA_SUCCESS, payload: {captcha}})

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        let data = await authAPI.me();
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}
export const loginThunk = (email:string, password:string, rememberMe:boolean, captcha:string) => {
    return async (dispatch: any) => {
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

    return async (dispatch: any) => {
        const response = await captchaAPI.captcha()
        const capthaUrl = response.data.url
        dispatch(getCaptchaSuccess(capthaUrl))
    }
}
export const logoutThunk = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
export default authReducer;