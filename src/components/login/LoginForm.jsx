import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Input } from "../common/formControls/FormsControls";
import { required } from "../common/utils/validators";
import s from "./../common/formControls/FormsControls.module.css"

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} component={Input} placeholder={"Email"} type="text" validate={required}/>
            </div>
            <div>
                <Field name={"password"} component={Input} placeholder={"Password"} type="password"
                       validate={[required,]}/>
            </div>
            <div><Field name={"RememberMe"} component={Input} type="checkbox"/>Remember me</div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
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