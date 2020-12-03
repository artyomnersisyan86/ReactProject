import './App.css';
import Navbar from "./components/navbar/Navbar";
import React from "react";
import { Route } from "react-router-dom"
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/setings/Setings";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import { connect } from "react-redux";
import { initializedApp } from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";

class App extends React.Component {

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            // <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        {/*<Route path='/profile' render={() => <Profile/>}/>*/}
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => {
                            return <DialogsContainer/>
                        }}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                    </div>
                </div>
            // </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}
export default connect(mapStateToProps, {initializedApp})(App)