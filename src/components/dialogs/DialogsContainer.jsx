// import React from "react";
import { addNewMessageFuncCreator, updateNewMessageCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux"
import { withAuthRedirect } from "../hoc/withAuthRedirect"
import { compose } from "redux"
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
        addNewMessage: state.dialogsPage.addNewMessage,
        // isAuth: state.auth.isAuth
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
// let AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
// export default DialogsContainer;