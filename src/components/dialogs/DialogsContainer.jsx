// import React from "react";
import {addNewMessageFuncCreator, updateNewMessageCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux"
// const DialogsContainer = (props) => {
//     let state = props.store.getState()
//     let onSendMessageClick = () => {
//         props.store.dispatch(addNewMessageFuncCreator());
//     }
//     let onNewMessageChange = (newText) => {
//         props.store.dispatch(updateNewMessageCreator(newText))
//     }
//     return (
//         <Dialogs addMessage={onSendMessageClick}
//                  addNewMessage={state.dialogsPage.addNewMessage}
//                  changeMessage={onNewMessageChange}
//                  dialogsPage={state.dialogsPage}/>
//     )
// }
let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        addNewMessage: state.dialogsPage.addNewMessage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addNewMessageFuncCreator());
        },
        changeMessage: (newText) => {
            dispatch(updateNewMessageCreator(newText))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer;