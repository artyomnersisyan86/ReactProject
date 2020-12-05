import React from "react";
import s from "./FormsControls.module.css"
import { Field } from "redux-form";

export let Textarea = ({input, meta:{touched,error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div><textarea {...input} {...props} /></div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
export let Input = ({input, meta:{touched,error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div><input {...input} {...props} /></div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const createFieldForm = (name, component, placeholder, props={}, validate,text="") => (
    <div>
        <Field
            name={name}
            component={component}
            placeholder={placeholder}
            {...props} validate={validate}

        />{text}
    </div>

)