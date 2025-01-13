import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from '../utils/constant'
import Card from "./Card"
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {

  const connections= useSelector((store)=>store.connection);
  console.log(connections)
  
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

  if (!connections) return;

  if (connections.length === 0) return <h1 className='flex justify-center my-10'> No Connections Found</h1>;
  
  return (
    // <div >
    //   <div className='text-center py-4 '>
    //     <h1 className='text-2xl text-white'>Connections</h1>
    //   </div>

    //  <div className='flex justify-center ' >
    //  {connections?.map((connection,index)=>
    //    ( <Card key={index} user={connection}/>)
    //    )}

    //  </div>
    
    // </div>
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
              

            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Connections