import React from "react";
import { AppHeader } from "./Header";
import { connect } from "react-redux"
import { logoutThunk } from "../../redux/authReducer";

class HeaderContainer extends React.Component {

    render() {
        return <AppHeader {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {logoutThunk})(HeaderContainer)
