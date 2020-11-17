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

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={() =>
                        <Profile
                            // store={props.store}
                        />}/>
                    <Route path='/dialogs' render={() => {
                        return <DialogsContainer
                            // store={props.store}
                            // dispatch={props.dispatch}
                            // addNewMessage={props.state.dialogsPage.addNewMessage}
                            // state={props.state.dialogsPage}
                        />
                    }}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' component={() => <Music/>}/>
                    <Route path='/settings' component={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
