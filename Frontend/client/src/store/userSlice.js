import { createSlice } from "@reduxjs/toolkit";

const user=createSlice({
    name:'user',
    initialState:{
        loginStatus:null,
        userDetails:null,
        
    },
    reducers:{
        loginUser:(state,action)=>{
            const {details}=action.payload
            state.loginStatus=true;
            state.userDetails=details
        },
        logoutUser:(state,action)=>{
            state.loginStatus=false;
            state.userDetails=null
        }
    }
})

export const {loginUser,logoutUser}= user.actions;

export default user.reducer