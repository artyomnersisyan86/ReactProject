import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Header} from "./components/header/Header";
import React from "react";
import Dialogs from "./components/dialogs/Dialogs";
// import Profile from "./components/profile/Profile";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            {/*<Profile/>*/}
            <Dialogs/>
        </div>
    );
}

export default App;
