import { createSlice } from "@reduxjs/toolkit";

const connection= createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnection:(state,action)=>{
            return action.payload
        } ,
        removeConnection: ()=> null
    }
})

export const {addConnection,removeConnection} = connection.actions;
export default connection.reducer;
