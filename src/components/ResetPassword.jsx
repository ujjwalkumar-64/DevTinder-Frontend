import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error,setError] = useState("");
    const[tost,setTost]= useState(false);

    const navigate = useNavigate()

    const handlePasswordReset= async()=>{
       setError("");
       try {
        const res = await axios.patch(BaseUrl+"/"+"profile/password" , {
            oldPassword,
            newPassword
        },
        {withCredentials:true})

        setTost(true);
            setTimeout(()=>{
                setTost(false)
                navigate("/")
            },2000)


    } catch (error) {
        setError(error?.response?.data);
        console.error(error);
    }
    }
   
  return (
    <>
            <div className='my-10 flex justify-center'>
        <div className="card bg-blue-100 sm:w-96 shadow-xl">
            <div className="card-body">
                
            <h2 className="card-title justify-center text-xl text-cyan-950">Password Reset</h2>  

                <label className="form-control   my-2">
                    <div className="label">
                        <span className="label-text text-800 text-cyan-800">Old Password</span>
                    </div>
                    <input type="password" 
                    value={oldPassword}
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs bg-cyan-50 text-cyan-700" 
                    onChange={(e)=>setOldPassword(e.target.value)}/>
                </label>

                <label className="form-control   my-2">
                    <div className="label">
                        <span className="label-text text-cyan-800">New Password</span>
                    </div>
                    <input type="password" 
                    value={newPassword}
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs bg-cyan-50 text-cyan-700" 
                    onChange={(e)=>setNewPassword(e.target.value)}/>
                </label>

                    <p className='text-red-800 my-2 '>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-accent" onClick={handlePasswordReset}>Save</button>
                    </div>     
            </div>
        </div>
        </div>

        { tost && (<div className="toast toast-top toast-center mx-4">
        <div className="alert alert-info">
        <span>Profile update successfully.</span>
        </div>
          
         </div>)}
    </>

  )
}

export default ResetPassword;
