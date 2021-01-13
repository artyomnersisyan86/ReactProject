import React, {FC} from "react";
import s from "./FormsControls.module.css"
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorsType} from "../utils/validators";


export let Textarea: FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div><textarea {...input} {...props} /></div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
export let Input: FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div><input {...input} {...props} /></div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export function createFieldForm <FormKeysType extends string>(name: FormKeysType, component: FC<WrappedFieldProps>,
                                         placeholder: string, props = {},
                                         validate: Array<FieldValidatorsType>, text = "") {
    return <div>
        <Field
            name={name}
            component={component}
            placeholder={placeholder}
            {...props} validate={validate}

        />{text}
    </div>;
}