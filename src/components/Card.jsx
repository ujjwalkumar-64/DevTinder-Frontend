import React from 'react'
import { BaseUrl } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeUserFromfeed } from '../utils/feedSlice'

const Card = ({user}) => {

    const dispatch= useDispatch();
  const  handleSendRequest = async(status,_id)=>{
   try {
     const res= await axios.post(BaseUrl+"/request/send"+"/"+ status+"/"+_id,        
      {},
      {withCredentials:true})

     console.log(res)
      dispatch(removeUserFromfeed(_id))

   } catch (error) {
      console.error(error)
   }
  }

    const{_id,firstName,lastName,photoUrl,about,age,gender,skills} = user
    
  return (
    <div className="card bg-base-300 shadow-xl mx-auto my-5 max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
     
        <figure className="p-5"  style={{ userSelect: "none" }}>
        <img
          src={photoUrl}
          alt="user photo" 
          className="rounded-full object-cover h-32 w-32 mx-auto"
          style={{ userSelect: "none" }} />
      </figure>
            
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title text-lg sm:text-xl text-center text-[#f1f1f1]"
         style={{ userSelect: "none" }}>
          {firstName + " "+ lastName}</h2>
        { age && gender  && (<p className="text-sm sm:text-base text-gray-500"  style={{ userSelect: "none" }}>{gender + " " + age} </p>)}
        <p className="text-center my-2 text-gray-300"  style={{ userSelect: "none" }}>{about} </p>
        <p className="text-center my-2 text-sm text-gray-400"  style={{ userSelect: "none" }}>{skills?.join(", ")}</p>

          <div className="card-actions flex justify-around w-full mt-4">
            <button className="btn btn-accent w-5/12"
            onClick={()=>handleSendRequest("ignored",_id)}>Ignored</button>
            <button className="btn btn-secondary w-5/12"
            onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
          </div>
      </div>
    </div>
  )
}

export default Card;
