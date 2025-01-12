import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BaseUrl } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const user = useSelector((state)=>state.user);

  const fetchUser = async()=>{
    if(user) return
    try {
     
      const res= await axios.get(BaseUrl+"/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));
     
    } catch (error) {
      if(error.status === 401){
        navigate("/login")
      }
      console.error(error);
    }
  }
  
useEffect(()=>{
  fetchUser();

},[])

  return (
    <div>
      <Navbar/>
        <main className='min-h-screen max-w-screen-2xl mx-auto '>
          <Outlet />
        </main>
      <Footer/>
    </div>
  )
}

export default Body
