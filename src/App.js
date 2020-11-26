import './App.css';
import Navbar from "./components/navbar/Navbar";
import React from "react";
// import Profile from "./components/profile/Profile";
import {Route, BrowserRouter} from "react-router-dom"
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/setings/Setings";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*<Route path='/profile' render={() => <Profile/>}/>*/}
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => {return <DialogsContainer/>}}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' component={() => <Music/>}/>
                    <Route path='/settings' component={() => <Settings/>}/>
                    <Route path='/users' component={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
