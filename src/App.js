import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Header} from "./components/header/Header";
import React from "react";
import Dialogs from "./components/dialogs/Dialogs";
import Profile from "./components/profile/Profile";
import {Route, BrowserRouter} from "react-router-dom"
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/setings/Setings";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*<Route path='/profile' component={Profile}/>*/}
                    {/*<Route path='/dialogs' component={Dialogs}/>*/}
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                    <Route path='/profile' render={() =>
                        <Profile
                            profilePage={props.state.profilePage}
                            addPost={props.addPost}
                            updateNewPostText={props.updateNewPostText}/>}/>
                    <Route path='/dialogs' render={() => {
                        return <Dialogs
                            addNewMessageFunc={props.addNewMessageFunc}
                            updateNewMessage={props.updateNewMessage}
                            addNewMessage={props.state.dialogsPage.addNewMessage}
                            state={props.state.dialogsPage}
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
