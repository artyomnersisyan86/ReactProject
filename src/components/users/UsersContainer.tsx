import React, {FC} from "react"
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/userSelectors";


type UsersPagePropsType={
    pageTitle:string
}
export const UsersPage :FC<UsersPagePropsType>=(props)=> {
const isFetching=useSelector(getIsFetching)


        return <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>

}


