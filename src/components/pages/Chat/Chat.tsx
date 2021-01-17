import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";
import s from "./Chat.module.css";

const wsChanel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
const ChatPage: FC = () => {
    return (
        <div><Chat/></div>
    )
}
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: string,
    userName: string,
}
const Chat: FC = () => {
    return (
        <div>
            <div><Messages/></div>
            <div><AddNewMessage/></div>
        </div>
    )
}

const Messages: FC = () => {

    const [messages, setMessage] = useState<ChatMessageType[]>([])
    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data)
            console.log(newMessages)
            debugger
            setMessage((prev) => [...prev, ...JSON.parse(e.data)])
        })
    }, [])

    // const messages = [1, 2, 3, 4]
    return <div style={{height: "400px", overflowY: "auto"}}>

        {messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>
}

const Message: FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img className={s.userPhoto} alt={"avatar"} src={message.photo}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}
const AddNewMessage: FC = () => {
    const [message, sendMessage] = useState("")
    const sendNewMessage = () => {
        if (message==="") {
            return
        } else {
            wsChanel.send(message)
            sendMessage("")
        }
    }
    return (
        <div>
            <div><textarea value={message} onChange={(e) => sendMessage(e.currentTarget.value)}></textarea></div>
            <div><Button onClick={sendNewMessage} type={"primary"}>Send message</Button></div>
        </div>
    )
}


export default ChatPage