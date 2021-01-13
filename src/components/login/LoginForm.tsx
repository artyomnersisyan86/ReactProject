import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createFieldForm, Input} from "../common/formControls/FormsControls";
import {required} from "../common/utils/validators";
import s from "./../common/formControls/FormsControls.module.css"
import {LoginFormValuesTypes, LoginFormValuesTypesKeys} from "./Login";

type LoginFormOwnPropsType = {
    captcha: string|null
}
let LoginForm: FC<InjectedFormProps<LoginFormValuesTypes,LoginFormOwnPropsType> & LoginFormOwnPropsType> =
    ({handleSubmit, error, captcha}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createFieldForm<LoginFormValuesTypesKeys>("email", Input, "Email", {type: "text"}, [required])}
            {createFieldForm<LoginFormValuesTypesKeys>("password", Input, "Password", {type: "password"}, [required])}
            {createFieldForm<LoginFormValuesTypesKeys>("rememberMe", Input, "", {type: "checkbox"}, [], "Remember Me")}
            <div>
                {captcha && <img src={captcha} alt={"captcha"}/>}
                {captcha && createFieldForm<LoginFormValuesTypesKeys>("captcha", Input, "Symbols for image", {type: "text"}, [required])}
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesTypes,LoginFormOwnPropsType>({
    // a unique name for the form
    form: 'Login'
})(LoginForm)
export default LoginReduxForm