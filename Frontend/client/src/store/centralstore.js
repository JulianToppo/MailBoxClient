import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mailSlice";
import userSlice from "./userSlice";


const store= configureStore({
    reducer:{
        'mail':mailSlice,
        'user':userSlice,
    }
})

export default store