import axios from 'axios'
import React, { useState } from 'react'
import { BaseUrl } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [firstName,setFirstName]= useState("")
    const [lastName,setLastName]= useState("")
    const [skills,setSkills]= useState([])
    const [gender,setGender]= useState("")
    const [about,setAbout]= useState("")
    const [photoUrl,setPhotoUrl] = useState("")
    const dispatch = useDispatch();
    const navigate= useNavigate();

    const handleSubmit= async()=>{
        try {
            const res= await axios.post(BaseUrl+"/signup",{
                email,
                firstName,
                lastName,
                password,
                skills,
                gender,
                about,
                photoUrl,
            },{
                withCredentials:true
            })
            console.log("signup :" ,res);
            dispatch(addUser(res.data.data));
            return navigate("/")
        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <div className='my-10 flex justify-center'>
    <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
            <h2 className="card-title justify-center">Signup Page</h2>
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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
            <label className="form-control w-full max-w-xs my-2">
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

            <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">Gender</span>
                </div>
                 <select className="select select-accent w-full max-w-xs"
                 value={gender}
                 onChange={(e)=> setGender(e.target.value)}
                 >
                <option disabled selected>Male or Female</option>
                <option>male</option>
                <option>female</option>
                <option>others</option>
            </select>
            </label>

            

            <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">Photo Url</span>
                </div>
                <input type="text" 
                    value={photoUrl} 
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs"
                    onChange={(e)=> setPhotoUrl(e.target.value)}
                />
                    
                    {//<input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                    }

            </label>

            <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">About</span>
                </div>
                 
                
                <textarea className="textarea textarea-accent"
                value={about} placeholder="About yourself"
                 onChange={(e)=> setAbout(e.target.value)}></textarea>
            </label>

            <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">Skills</span>
                </div>
                <input type="text" 
                    value={skills} 
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs"
                    onChange={(e)=> setSkills(e.target.value)}
                    />
            </label>


                <div className="card-actions justify-center m-2">
                    <button className="btn btn-accent" onClick={handleSubmit}>Submit</button>
                </div>
        </div>
    </div>
</div>
  )
}

export default Signup
