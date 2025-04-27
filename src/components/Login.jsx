import React, { useState } from 'react'
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../utils/constant';

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [firstName,setFirstName]= useState("")
    const [lastName,setLastName]= useState("")

    const isloggedIn = location.pathname === "/login";
    
    const [error,setError]= useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin= async()=>{
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
            
         }
    }

    const handleSignup= async()=>{
        setError("");
        try {
            const res= await axios.post(BaseUrl+"/signup",{
                email,
                firstName,
                lastName,
                password,    
            },{
                withCredentials:true
            })
            
            dispatch(addUser(res.data.data));
            return navigate("/profile")
        } catch (error) {
            setError(error?.response?.data || "Something went wrong")
        }
    }
    


  return (
    <div className='my-10 flex justify-center'>
        <div className="card bg-base-300 sm:w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-xl">{isloggedIn?"Login Page":"Signup Page"}</h2>

                {
                    !isloggedIn && 
                    <>

                    <label className="form-control    my-2">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input type="text" 
                            value={firstName} 
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs"
                            onChange={(e)=> setFirstName(e.target.value)}
                            />
                    </label>
                    <label className="form-control   my-2">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input type="text" 
                            value={lastName} 
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs"
                            onChange={(e)=> setLastName(e.target.value)}
                            />
                    </label>

                    </>
                }

                <label className="form-control   my-2">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="email" 
                        value={email} 
                        placeholder="Type here" 
                        className="input input-bordered input-accent w-full max-w-xs"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </label>
                <label className="form-control   my-2">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" 
                    value={password}
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs" 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </label>

                    <p className='text-red-800 my-2 '>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-accent ml-2" onClick={isloggedIn? handleLogin :  handleSignup}>Submit</button>
                        {isloggedIn && (
                            <button
                                className="btn btn-secondary ml-2"
                                onClick={() => {
                                    setEmail("dev@gmail.com");
                                    setPassword("Rgipt@123");
                                    handleLogin();
                                }}
                            >
                                Guest Login
                            </button>
                        )}
                    </div>

                    <p
                        className="text-center cursor-pointer py-2"
                        onClick={() => navigate(isloggedIn ? "/signup" : "/login")}
                    >
                        {isloggedIn
                        ? "New User? Signup Here"
                        : "Existing User? Login Here"}
                    </p>
                     
            </div>
        </div>
    </div>
  )
}

export default Login
