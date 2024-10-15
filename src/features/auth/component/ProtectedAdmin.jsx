import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectedLoggedInUser, selectedUserDetails } from "../authSlice";

export function ProtectedAdmin({children}){
    const user=useSelector(selectedLoggedInUser)
    const userInfo= useSelector(selectedUserDetails)
    if(!user){
        return <Navigate to={'/login'} replace="true"></Navigate>
    }

    if(userInfo && userInfo?.role !=='admin'){
        return <Navigate to='/' replace="true"></Navigate>
    }
    return children


}