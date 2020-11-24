import React from "react"
import preloader from "../../../assets/images/preloader"

let Preloader = (props) => {
    return (
            <div style={{backgroundColor: "white"}}>
                <img src={preloader} alt={"loader ..."}/>
        </div>
    )
}
export default Preloader;