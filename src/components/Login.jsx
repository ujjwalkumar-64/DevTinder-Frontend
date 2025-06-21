import React, { useState, useEffect } from 'react'
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
    const [githubUsername,setGithubUsername]= useState("")
    const [guestLoginTriggered, setGuestLoginTriggered] = useState(false);

    const isloggedIn = location.pathname === "/login";
    
    const [error,setError]= useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (guestLoginTriggered) {
            handleLogin();
            setGuestLoginTriggered(false); // Reset the trigger
        }
    }, [guestLoginTriggered, email, password]);

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
                githubUsername  
            },{
                withCredentials:true
            })
            
            dispatch(addUser(res.data.data));
            return navigate("/profile")
        } catch (error) {
            setError(error?.response?.data || "Something went wrong")
        }
    }
    
    const handleGuestLogin = () => {
        // Set guest credentials
        setEmail("dev@gmail.com");
        setPassword("Rgipt@123");

        // Trigger guest login after state updates
        setGuestLoginTriggered(true);
    };


  return (
    <div className='my-10 flex justify-center'>
        <div className="card bg-blue-100 sm:w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-cyan-950 justify-center text-xl">{isloggedIn?"Login Page":"Signup Page"}</h2>

                {
                    !isloggedIn && 
                    <>

                    <label className="form-control    my-2">
                        <div className="label">
                            <span className="label-text text-cyan-800">First Name</span>
                        </div>
                        <input type="text" 
                            value={firstName} 
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs bg-cyan-50 text-cyan-700"
                            onChange={(e)=> setFirstName(e.target.value)}
                            />
                    </label>
                    <label className="form-control   my-2">
                        <div className="label">
                            <span className="label-text text-cyan-800">Last Name</span>
                        </div>
                        <input type="text" 
                            value={lastName} 
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs bg-cyan-50 text-cyan-700"
                            onChange={(e)=> setLastName(e.target.value)}
                            />
                    </label>
                    <label className="form-control   my-2">
                        <div className="label">
                            <span className="label-text text-cyan-800">Github Username</span>
                        </div>
                        <input type="text" 
                            value={githubUsername } 
                            placeholder="Type here text-cyan-800" 
                            className="input input-bordered input-accent w-full max-w-xs text-cyan-700 bg-cyan-50"
                            onChange={(e)=> setGithubUsername(e.target.value)}
                            />
                    </label>

                    </>
                }

                <label className="form-control   my-2">
                    <div className="label">
                        <span className="label-text text-cyan-800">Email</span>
                    </div>
                    <input type="email" 
                        value={email} 
                        placeholder="Type here" 
                        className="input input-bordered input-accent w-full max-w-xs text-cyan-700 bg-cyan-50"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </label>
                <label className="form-control   my-2">
                    <div className="label">
                        <span className="label-text text-cyan-800">Password</span>
                    </div>
                    <input type="password" 
                    value={password}
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs text-cyan-700 bg-cyan-50" 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </label>

                    <p className='text-red-800 my-2 '>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-accent ml-2" onClick={isloggedIn? handleLogin :  handleSignup}>Submit</button>
                        {isloggedIn && (
                            <button
                                className="btn btn-secondary ml-2"
                                onClick={handleGuestLogin}
                            >
                                Guest Login
                            </button>
                        )}
                    </div>

                    <p
                        className="text-center cursor-pointer py-2 text-slate-700"
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
