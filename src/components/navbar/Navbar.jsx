import React from "react"
import s from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={`${s.itemActive} ${s.item}`}><a href='#s'> Profile</a></div>
            <div><a href='#s'> Messges</a></div>
            <div><a href='#s'>News </a></div>
            <div><a href='#s'> Music</a></div>
            <div><a href='#s'> Setings</a></div>
        </nav>
    )
}
export default Navbar;