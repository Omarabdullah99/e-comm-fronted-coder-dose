import { useSelector } from "react-redux";
import { selectedLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export function Protected({children}){
    const user=useSelector(selectedLoggedInUser)
    if(!user){
        return <Navigate to={'/login'} replace="true"></Navigate>
    }
    return children


}