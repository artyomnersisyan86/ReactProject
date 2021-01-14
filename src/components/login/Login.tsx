import React, {FC} from "react"
import LoginReduxForm from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../redux/authReducer";
import {Redirect} from 'react-router-dom'
import {AppStateType} from "../../redux/redux-store";

export type LoginFormValuesTypes = {
    captcha: string
    password: string;
    rememberMe: boolean;
    email: string;
}

export type LoginFormValuesTypesKeys = keyof LoginFormValuesTypes

const Login: FC = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captcha = useSelector((state: AppStateType) => state.auth.captcha)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesTypes) => {
        console.log(formData)
        dispatch(loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
        </div>)
}

export default Login
