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
    <div className="card bg-base-300 w-96 shadow-xl mx-3">
     
        <figure>
        <img
          src={photoUrl}
          alt="user photo" />
      </figure>
            
      <div className="card-body">
        <h2 className="card-title">{firstName + " "+ lastName}</h2>
        { age && gender  && (<p>{gender + " " + age} </p>)}
        <p>{about} </p>
        <p>{skills?.join(", ")}</p>

          <div className="card-actions justify-center my-4">
            <button className="btn btn-accent"
            onClick={()=>handleSendRequest("ignored",_id)}>Ignored</button>
            <button className="btn btn-secondary"
            onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
          </div>
      </div>
    </div>
  )
}

export default Card
