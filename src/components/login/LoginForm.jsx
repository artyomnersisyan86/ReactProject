import React from "react";
import { reduxForm } from 'redux-form'
import { createFieldForm, Input } from "../common/formControls/FormsControls";
import { required } from "../common/utils/validators";
import s from "./../common/formControls/FormsControls.module.css"

let LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createFieldForm("email", Input, "Email", {type: "text"}, [required])}
            {createFieldForm("password", Input, "Password", {type: "password"}, [required])}
            {createFieldForm("RememberMe", Input, "", {type: "checkbox"}, [], "Remember Me")}
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'Login'
})(LoginForm)
export default LoginReduxForm