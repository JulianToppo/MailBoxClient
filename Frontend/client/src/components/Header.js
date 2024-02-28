import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";

const Header = () => {
    const userStore= useSelector((store)=>store.user)
    const dispatch=useDispatch()
    const onLogoutClickHandler=(e)=>{
        e.preventDefault();
        dispatch(logoutUser());
        localStorage.removeItem('token')

    }
  return (
    <div className="flex justify-around p-3 h-4/12 bg-blue-200">
      <img src={"mail.png"} className="h-[30px]"></img>
      <input className="w-1/2 rounded-md"></input>
      <p className="cursor-pointer" onClick={onLogoutClickHandler}>Logout</p>
    </div>
  );
};

export default Header;
