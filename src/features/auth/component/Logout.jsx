import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectedLoggedInUser, signOutAsync } from "../authSlice";


function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectedLoggedInUser)

    useEffect(()=>{
        dispatch(signOutAsync())
    })

    // but useEffect runs after render, so we have to delay navigate part
    return ( 
        <>
        {!user && <Navigate to='/login' replace={true}></Navigate>}
        </>
     );
}

export default Logout;