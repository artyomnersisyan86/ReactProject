import {Field, Form, Formik } from "formik";
import React from "react";

const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type userSearchFormObjectType = {
    term: string
}
const UserSearchForm = () => {

    const submit = (values: userSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }
    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>)
}
export default UserSearchForm