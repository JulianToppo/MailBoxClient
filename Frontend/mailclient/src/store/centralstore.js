import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mailSlice";


const store= configureStore({
    reducer:{
        'mail':mailSlice
    }
})

export default store