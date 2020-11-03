import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

const Dialogs = (props) => {


    let dialogsElements = props.state.dialogds.map((d, i) => {
        return <DialogItem key={i} name={d.name} id={d.id}/>
    })
    let messageElements = props.state.messages.map((m, j) => {
        return <Message key={j} message={m.message}/>
    })
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    )
}
export default Dialogs;