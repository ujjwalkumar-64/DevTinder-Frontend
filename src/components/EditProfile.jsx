import React, { useState } from 'react'
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BaseUrl } from '../utils/constant';
import Card from './Card';

const EditProfile = ({user}) => {
    const [firstName,setFirstName]= useState(user.firstName)
    const [lastName,setLastName]= useState(user.lastName)
    const [skills,setSkills]= useState(user.skills || [])
    const [gender,setGender]= useState(user.gender || "")
    const [about,setAbout]= useState(user.about ||"")
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl ||"")
    const [age,setAge]= useState(user.age ||"");
    const [error,setError]= useState("");

    const[tost,setTost]= useState(false);

    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        const skillArray = value.split(",").map((skill) => skill.trim());
        setSkills(skillArray);
      };
    

    const handleUpdate= async()=>{
        setError("");
         try {
            const res= await axios.patch(BaseUrl + "/profile/edit",{
                 firstName,
                 lastName,
                 skills,
                 gender,
                 about,
                 photoUrl,
                 age,
            },
        {
            withCredentials:true
        })
            dispatch(addUser(res?.data?.data));
            setTost(true);
            setTimeout(()=>{
                setTost(false)
            },3000)
            
         } catch (error) {
            setError(error?.response?.data)
            console.error(error)
         }
    }
  return (
     <>

    <div className='flex justify-center my-10'>
        <div className=' flex justify-center mx-10'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
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
                        onChange={(e)=>setLastName(e.target.value)}/>
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text">Age</span>
                        </div>
                        <input type="number" 
                        value={age}
                        placeholder="Type here" 
                        className="input input-bordered input-accent w-full max-w-xs" 
                        onChange={(e)=>setAge(e.target.value)}/>
                    </label>

                    <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                        <span className="label-text">Gender</span>
                    </div>
                    <select className="select select-accent w-full max-w-xs"
                    value={gender}
                    onChange={(e)=> setGender(e.target.value)}
                    >
                    
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
                        <span className="label-text">Skills</span>
                    </div>
                    <input type="text" 
                        value={skills?.join(", ")} 
                        placeholder="Type skills separated by commas" 
                        className="input input-bordered input-accent w-full max-w-xs"
                        onChange={handleInputChange}
                        />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                        <span className="label-text">About</span>
                    </div>
                    
                    
                    <textarea className="textarea textarea-accent"
                    value={about} placeholder="About yourself"
                    onChange={(e)=> setAbout(e.target.value)}></textarea>
                </label>
                        <p className='text-red-800'>{error}</p>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-accent" onClick={handleUpdate}>Save Edit</button>
                        </div>
                </div>
            </div>
        </div>
                        
       <div >
       <Card user={{firstName,lastName,about,skills,age,gender,photoUrl}}/>
       </div>
    </div>

    { tost && (<div className="toast toast-top toast-center">
        <div className="alert alert-info">
        <span>Profile update successfully.</span>
        </div>
          
    </div>)}
    
    </>
  )
}


export default EditProfile
