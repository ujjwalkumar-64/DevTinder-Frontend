import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from '../utils/constant'
import { useDispatch,useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector((state)=>state.request)
  const dispatch = useDispatch();

  const fetchRequests= async()=>{
    try {
      const res = await axios.get(BaseUrl+"/user/requests/received",
      {withCredentials:true})

      console.log(res);
      dispatch(addRequest(res.data.data));

    } catch (error) {
      console.error(error)
    }
    
  }

  const reviewRequest = async (status,_id)=>{
    try {
      const res = await axios.post(BaseUrl +"/request/review"+ "/" + status+ "/"+ _id,
        {},
        {withCredentials:true});
        
        dispatch(removeRequest(_id));

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[])

  if (!requests) return <h1 className="flex justify-center items-center my-10 text-gray-600">Loading...</h1>;

  if (requests.length === 0) return <h1 className="flex justify-center items-center my-10 text-gray-600"  style={{ userSelect: "none" }} > No Connection Request Found</h1>;
  
  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl mb-6"  style={{ userSelect: "none" }} >Connection Requests</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex flex-col justify-between items-center bg-base-300 shadow-md rounded-lg p-4 w-full sm:w-4/5 lg:w-3/5 mx-auto my-6"
           >
            <div className="flex-shrink-0 mb-4"  style={{ userSelect: "none" }}>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
                style={{ userSelect: "none" }}
              />
            </div>
            <div className="text-center mb-4">
              <h2 className="font-bold text-xl text-gray-250" style={{ userSelect: "none" }}>
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className='text-gray-600'  style={{ userSelect: "none" }}>{age + ", " + gender}</p>}
              <p className='text-gray-450 mt-1' style={{ userSelect: "none" }}>{about}</p>
            </div>
            <div className="flex justify-center ">
              <button
                className="btn btn-primary  mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Requests
