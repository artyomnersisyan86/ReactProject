import './App.css';
import Navbar from "./components/navbar/Navbar";
import React from "react";
import {Route} from "react-router-dom"
// import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import {compose} from "redux"
import {withRouter} from "react-router-dom";
import {withSuspense} from "./components/hoc/withSunpense";
import store from "./redux/redux-store";
import {BrowserRouter, Switch, Redirect} from "react-router-dom"
import {UsersPage} from "./components/users/UsersContainer";

const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"));
const News = React.lazy(() => import("./components/news/News"));
const Music = React.lazy(() => import("./components/music/Music"));
const Settings = React.lazy(() => import("./components/setings/Setings"));
const Login = React.lazy(() => import("./components/login/Login"));


class App extends React.Component {

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        {/*<Route path='/profile' render={() => <Profile/>}/>*/}
                        {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        {/*<Route path='/dialogs' render={() => {return <DialogsContainer/>}}/>*/}
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        {/*<Route path='/news' render={() => <News/>}/>*/}
                        <Route path='/news' render={withSuspense(News)}/>
                        <Route path='/login' render={withSuspense(Login)}/>

                        {/*<Route path='/music' render={() => <Music/>}/>*/}
                        <Route path='/music' render={withSuspense(Music)}/>
                        {/*<Route path='/settings' render={() => <Settings/>}/>*/}
                        <Route path='/settings' render={withSuspense(Settings)}/>
                        <Route path='/users' render={() => <UsersPage pageTitle={"Hello"}/>}/>
                        {/*<Route path='*' render={() => <div>Error 404</div>}/>*/}

                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(App)

let MainApp = (props) => {
    return (
        <BrowserRouter>

            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainApp