import React from "react";
import s from "./FormsControls.module.css"

export let Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div><textarea {...input} {...props} /></div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export let Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div><input {...input} {...props} /></div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}