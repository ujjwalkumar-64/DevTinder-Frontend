import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {

  const connections= useSelector((store)=>store.connection);
  
  const dispatch= useDispatch();
  const fetchConnections = async()=>{
      try {
          const res= await axios.get(BaseUrl + "/user/connections",{
            withCredentials:true
          })
          dispatch(addConnection(res.data.data))

      } catch (error) {
          console.error(error)
      }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1 className="flex justify-center items-center my-10 text-lg text-gray-600">Loading...</h1>;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center items-center my-10 text-lg text-gray-600">
        No Connections Found
      </h1>
    );
  
  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl  mb-6">Connections</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">  
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className=" flex items-center bg-base-300 shadow-md rounded-lg p-4 w-full sm:w-4/5 lg:w-3/4 mx-auto"
          >
            <div className='flex-shrink-0'>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 flex-1 ">
              <h2 className="font-bold text-xl text-gray-200">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="text-gray-600" >{age + ", " + gender}</p>}
              <p className="text-gray-700 mt-1">{about}</p>
              

            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};


export default Connections;
