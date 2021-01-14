import './App.css';
import 'antd/dist/antd.css';
import Navbar from "./components/navbar/Navbar";
import React from "react";
import { Route } from "react-router-dom"
// import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { initializedApp } from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import { compose } from "redux"
import { withRouter } from "react-router-dom";
import { withSuspense } from "./components/hoc/withSunpense";
import store from "./redux/redux-store";
import { BrowserRouter, Switch, Redirect, Link } from "react-router-dom"
import { UsersPage } from "./components/users/UsersContainer";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import s from "./components/navbar/Navbar.module.css";

const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));
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
                    <HeaderContainer/>
                    {/*<Header className="header">*/}
                    {/*    <div className="logo"/>*/}
                    {/*    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}
                    {/*        <Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*        <Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*        <Menu.Item key="3">nav 3</Menu.Item>*/}
                    {/*    </Menu>*/}
                    {/*</Header>*/}
                    <Content style={{padding: '0 50px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    // defaultSelectedKeys={['1']}
                                    // defaultOpenKeys={['sub1']}
                                    style={{height: '100%'}}>
                                    <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                        <Menu.Item key="1"><Link to='/profile'> Profile</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to='/dialogs'> Messges</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                        <Menu.Item key="5"><Link to='/users'> Users</Link></Menu.Item>
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
                                    <Route path='/login' render={withSuspense(Login)}/>

                                    {/*<Route path='/music' render={() => <Music/>}/>*/}
                                    <Route path='/music' render={withSuspense(Music)}/>
                                    {/*<Route path='/settings' render={() => <Settings/>}/>*/}
                                    <Route path='/settings' render={withSuspense(Settings)}/>
                                    <Route path='/users' render={() => <UsersPage pageTitle={"Hello"}/>}/>
                                    {/*<Route path='*' render={() => <div>Error 404</div>}/>*/}
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
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