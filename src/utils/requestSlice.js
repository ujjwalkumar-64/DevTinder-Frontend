import { createSlice } from "@reduxjs/toolkit";

const request= createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=> action.payload,
        removeRequest:(state,action) =>{
            const newArray = state.filter((req) => req._id !== action.payload)
            return newArray;
        }
    }
})

export const {addRequest,removeRequest} = request.actions

export default request.reducer;