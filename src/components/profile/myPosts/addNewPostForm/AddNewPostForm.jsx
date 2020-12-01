import React from "react";
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../../../common/utils/validators";
import { Textarea } from "../../../common/formControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

export let AddNewPostForm = (props) => {

    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea} type={"text"} name={"addPost"}
                       validate={[required, maxLength10,]} placeholder={"New post text"}
                />
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
}
AddNewPostForm = reduxForm({
    // a unique name for the form
    form: 'addNewPost'
})(AddNewPostForm)

export default AddNewPostForm