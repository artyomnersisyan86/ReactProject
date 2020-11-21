import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Header} from "./components/header/Header";
import React from "react";
import Profile from "./components/profile/Profile";
import {Route, BrowserRouter} from "react-router-dom"
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/setings/Setings";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={() => <Profile/>}/>
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
