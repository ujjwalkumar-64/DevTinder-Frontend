import React, { useState } from 'react'
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../utils/constant';

const Login = () => {
    const [email,setEmail]= useState("sunny@gmail.com");
    const [password,setPassword]= useState("Dghgdf12@3");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError]= useState("");

    const handleSubmit= async()=>{
         try {
            const res= await axios.post(BaseUrl + "/login",{
                email,
                password
            },
        {
            withCredentials:true
        })
            dispatch(addUser(res.data.data));
           return  navigate("/")
         } catch (error) {
            setError(error?.response?.data)
            console.error(error)
         }
    }
  return (
    <div className='my-10 flex justify-center'>
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Login Page</h2>
                <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type="email" 
                        value={email} 
                        placeholder="Type here" 
                        className="input input-bordered input-accent w-full max-w-xs"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" 
                    value={password}
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs" 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                    <p className='text-red-800'>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-accent" onClick={handleSubmit}>Submit</button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login
