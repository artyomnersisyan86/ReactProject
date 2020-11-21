import React from "react"
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom"

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={`${s.item}`}><NavLink activeClassName={s.activeLink} to='/profile'> Profile</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to='/dialogs'> Messges</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to='/news'>News </NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to='/music'> Music</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to='/settings'> Setings</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to='/users'> Users</NavLink></div>
        </nav>
    )
}
export default Navbar;