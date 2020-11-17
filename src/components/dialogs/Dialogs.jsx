import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

const Dialogs = (props) => {
    let dialogsPage = props.dialogsPage;
    let dialogsElements = dialogsPage.dialogds.map((d, i) => {
        return <DialogItem key={i} name={d.name} id={d.id}/>
    })
    let messageElements = dialogsPage.messages.map((m, j) => {
        return <Message key={j} message={m.message}/>
    })
    let onSendMessageClick = () => {
        props.addMessage()
    }
    let onNewMessageChange = (e) => {
        let newText = e.target.value
        props.changeMessage(newText)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <div><textarea
                    onChange={onNewMessageChange}
                    placeholder="Enter your message"
                    value={props.addNewMessage}/></div>
                <div>
                    <button onClick={onSendMessageClick}>Send</button>
                </div>
            </div>
        </div>
    )
}
export default Dialogs;