import React from "react"
import LoginReduxForm from "./LoginForm";
import { connect } from "react-redux";
import { loginThunk } from "../../redux/authReducer";
import { Redirect } from 'react-router-dom'

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.loginThunk(formData.email, formData.password, formData.rememberMe,formData.captcha)
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
const mapStateToProps = (staate) => {
    return {
        isAuth: staate.auth.isAuth,
        captcha: staate.auth.captcha,

    }
}
export default connect(mapStateToProps, {loginThunk})(Login)
