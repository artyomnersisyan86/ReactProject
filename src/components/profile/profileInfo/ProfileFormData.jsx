import React from "react";
import { createFieldForm, Input, Textarea } from "../../common/formControls/FormsControls";
import { reduxForm } from "redux-form";
import s from "./ProfilInfo.module.css";
import styles from "./../../common/formControls/FormsControls.module.css"

const ProfileFormData = ({profile, handleSubmit,error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>Save</button>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div><b>Full Name </b>
                {createFieldForm("fullName", Input, "Full Name", {type: "text"}, [])}
            </div>

            <div><b>looking for A job</b>
                {createFieldForm("lookingForAJob", Input, "", {type: "checkbox"}, [])}

            </div>


            <div><b>My professional skills</b>
                {createFieldForm("lookingForAJobDescription", Textarea, "My professional skills", {type: "textarea"}, [])}

            </div>

            <div><b>AboutMe </b>
                {createFieldForm("aboutMe", Textarea, "About Me", {type: "textarea"}, [])}

            </div>

            <div><b>Contacts</b>: <strong>{Object.keys(profile.contacts).map((key) => {
                return <div className={s.contact} key={key}>
                    {key}
                    {createFieldForm("contacts." + key, Input, key, {type: "text"}, [])}

                </div>
            })}</strong></div>
        </form>
    )
}
const ProfileFormDataReduxForm = reduxForm({
    // a unique name for the form
    form: 'editProfile'
})(ProfileFormData)

export default ProfileFormDataReduxForm