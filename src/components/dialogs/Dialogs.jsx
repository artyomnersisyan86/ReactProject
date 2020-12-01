import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../common/utils/validators";
import { Textarea } from "../common/formControls/FormsControls";

const maxLength30 = maxLengthCreator(30)

const Dialogs = (props) => {
    let dialogsPage = props.dialogsPage;
    let dialogsElements = dialogsPage.dialogds.map((d, i) => {
        return <DialogItem key={i} name={d.name} id={d.id}/>
    })
    let messageElements = dialogsPage.messages.map((m, j) => {
        return <Message key={j} message={m.message}/>
    })
    let addNewMessageSubmit = (values) => {
        props.addMessage(values.addNewMessage)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>

                {/*<div><textarea*/}
                {/*    onChange={onNewMessageChange}*/}
                {/*    placeholder="Enter your message111"*/}
                {/*    value={props.addNewMessage}/></div>*/}
                {/*<div>*/}
                {/*    <button onClick={onSendMessageClick}>Send</button>*/}
                {/*</div>*/}
                <AddMessageForm onSubmit={addNewMessageSubmit}/>
            </div>
        </div>
    )
}
let AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="addNewMessage" type={"text"} component={Textarea} placeholder="Enter your message111"
                       validate={[required, maxLength30,]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>

        </form>
    )
}
AddMessageForm = reduxForm({
    // a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;