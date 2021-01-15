import './App.css';
import 'antd/dist/antd.css';
import React from "react";
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom"
// import UsersContainer from "./components/users/UsersContainer";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import {compose} from "redux"
import {withSuspense} from "./components/hoc/withSunpense";
import store from "./redux/redux-store";
import {UsersPage} from "./components/users/UsersContainer";
import {Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/header/Header";
// import ChatPage from "./pages/Chat/Chat";

const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));
const ChatPage = React.lazy(() => import("./components/pages/Chat/Chat"));
const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"));
const News = React.lazy(() => import("./components/news/News"));
const Music = React.lazy(() => import("./components/music/Music"));
const Settings = React.lazy(() => import("./components/setings/Setings"));
const Login = React.lazy(() => import("./components/login/Login"));

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;


class App extends React.Component {

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div>
                <Layout>
                    <AppHeader/>

                    <Content style={{padding: '0 5px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu mode="inline"
                                    // defaultSelectedKeys={['1']}
                                    // defaultOpenKeys={['sub1']}
                                    style={{height: '100%'}}>
                                    <SubMenu  icon={<UserOutlined/>} title="My Profile">
                                        <Menu.Item ><Link to='/profile'> Profile</Link></Menu.Item>
                                        <Menu.Item ><Link to='/dialogs'> Messages</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu  icon={<LaptopOutlined/>} title="Developers">
                                        <Menu.Item ><Link to='/users'> Users</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu  icon={<LaptopOutlined/>} title="Chat">
                                        <Menu.Item ><Link to='/chat'> Chat Page</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                                    {/*<Route path='/profile' render={() => <Profile/>}/>*/}
                                    {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
                                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                                    {/*<Route path='/dialogs' render={() => {return <DialogsContainer/>}}/>*/}
                                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                                    {/*<Route path='/news' render={() => <News/>}/>*/}
                                    <Route path='/news' render={withSuspense(News)}/>
                                    <Route path='/chat' render={withSuspense(ChatPage)}/>
                                    <Route path='/login' render={withSuspense(Login)}/>

                                    {/*<Route path='/music' render={() => <Music/>}/>*/}
                                    <Route path='/music' render={withSuspense(Music)}/>
                                    {/*<Route path='/settings' render={() => <Settings/>}/>*/}
                                    <Route path='/settings' render={withSuspense(Settings)}/>
                                    <Route path='/users' render={() => <UsersPage pageTitle={"Developers Page"}/>}/>
                                    {/*<Route path='*' render={() => <div>Error 404</div>}/>*/}
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}> ©2021 Created by Nersisyan Prodaction</Footer>
                </Layout>
            </div>
            // <div className='app-wrapper'>
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className='app-wrapper-content'>
            //         <Switch>
            //             <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
            //             {/*<Route path='/profile' render={() => <Profile/>}/>*/}
            //             {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}
            //             <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
            //             {/*<Route path='/dialogs' render={() => {return <DialogsContainer/>}}/>*/}
            //             <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
            //             {/*<Route path='/news' render={() => <News/>}/>*/}
            //             <Route path='/news' render={withSuspense(News)}/>
            //             <Route path='/login' render={withSuspense(Login)}/>
            //
            //             {/*<Route path='/music' render={() => <Music/>}/>*/}
            //             <Route path='/music' render={withSuspense(Music)}/>
            //             {/*<Route path='/settings' render={() => <Settings/>}/>*/}
            //             <Route path='/settings' render={withSuspense(Settings)}/>
            //             <Route path='/users' render={() => <UsersPage pageTitle={"Hello"}/>}/>
            //             {/*<Route path='*' render={() => <div>Error 404</div>}/>*/}
            //
            //         </Switch>
            //     </div>
            // </div>
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