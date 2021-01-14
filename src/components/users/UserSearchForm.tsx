import {Field, Form, Formik} from "formik";
import React, {FC, memo} from "react";
import {FilterSearchType} from "../../redux/usersReducer";

const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterSearchType) => void
}
const UserSearchForm: FC<PropsType> = memo((props) => {

    const submit = (values: FilterSearchType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setTimeout(() => {
            setSubmitting(false);
        }, 400);
    }
    return (
        <div>
            <Formik
                initialValues={{term: '',friend:undefined}}
                validate={userSearchFormValidate}
                onSubmit={submit}>
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>

                        <Field name="friend" as="select">
                            <option value={"undefined"}>All</option>
                            <option value={"true"}>Only Followed</option>
                            <option value={"false"}>Only UnFollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>)
})
export default UserSearchForm