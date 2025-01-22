import { createSlice } from "@reduxjs/toolkit";

const connection= createSlice({
    name:"connection",
    initialState:[],
    reducers:{
        addConnection:(state,action)=>{
            if (Array.isArray(action.payload)) {
                return action.payload.filter(
                  (connection) =>
                    connection &&
                    typeof connection === 'object' &&
                    connection._id 
                );
              }
              return state;  
            },
      
        removeConnection: ()=> null
    }
})

export const {addConnection,removeConnection} = connection.actions;
export default connection.reducer;
