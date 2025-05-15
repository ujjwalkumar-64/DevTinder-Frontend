import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {

  const connections= useSelector((store)=>store.connection || []);
  
  const dispatch= useDispatch();
  const fetchConnections = async()=>{
      try {
          const res= await axios.get(BaseUrl + "/user/connections",{
            withCredentials:true
          })
          dispatch(addConnection(res.data.data || []))

      } catch (error) {
          console.error(error)
      }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null) 
    return (
      <h1 className="flex justify-center items-center my-10 text-lg text-gray-600">
        Loading...
      </h1>
    );


  if (connections.length === 0)
    return (
      <h1 className="flex justify-center items-center my-10 text-lg text-gray-600">
        No Connections Found
      </h1>
    );
  
  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl  mb-6"  style={{ userSelect: "none" }}>Connections</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">  
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className=" flex items-center bg-base-300 shadow-md rounded-lg p-4 w-full sm:w-4/5 lg:w-3/4 mx-auto"
          >
            <div className='flex-shrink-0'  style={{ userSelect: "none" }}>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
                style={{ userSelect: "none" }}
              />
            </div>
            <div className="text-left mx-4 flex-1 ">
              <h2 className="font-bold text-xl text-gray-200"  style={{ userSelect: "none" }}>
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="text-gray-600"  style={{ userSelect: "none" }} >{age + ", " + gender}</p>}
              <p className="text-gray-550 mt-1"  style={{ userSelect: "none" }}>{about}</p>
              

            </div>
            <Link to={"/chat/"+ _id}><button className='btn btn-secondary'>Chat</button></Link>
            <Link to={"/call/"+ _id}><button className='btn btn-secondary'>Video Call</button></Link>
          </div>
        );
      })}
    </div>
    </div>
  );
};


export default Connections;
