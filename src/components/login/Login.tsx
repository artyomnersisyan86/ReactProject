import React, {FC} from "react"
import LoginReduxForm from "./LoginForm";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/authReducer";
import {Redirect} from 'react-router-dom'
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
    isAuth: Boolean
    captcha: string | null
}
type MapDispatchToPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesTypes = {
    captcha: string
    password: string;
    rememberMe: boolean;
    email: string;

}

export type LoginFormValuesTypesKeys = keyof LoginFormValuesTypes

const Login: FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesTypes) => {
        console.log(formData)
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>)
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha,
    }
}

export default connect(mapStateToProps, {loginThunk})(Login)
