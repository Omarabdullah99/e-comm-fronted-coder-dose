import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectedLoggedInUser } from "../authSlice";

export function ProtectedAdmin({children}){
    const user=useSelector(selectedLoggedInUser)
    if(!user){
        return <Navigate to={'/login'} replace="true"></Navigate>
    }

    if(user && user?.role !=='admin'){
        return <Navigate to='/' replace="true"></Navigate>
    }
    return children


}