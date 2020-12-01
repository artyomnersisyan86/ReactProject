import { addNewMessageFuncCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux"
import { withAuthRedirect } from "../hoc/withAuthRedirect"
import { compose } from "redux"

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        addNewMessage: state.dialogsPage.addNewMessage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        addMessage: (newMessageBody) => {
            dispatch(addNewMessageFuncCreator(newMessageBody));
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
