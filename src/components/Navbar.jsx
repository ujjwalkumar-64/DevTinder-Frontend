import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../utils/constant';
import { removeUser } from '../utils/userSlice';
 

const Navbar = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);

  const handleLogout = async()=>{
    try {
      axios.post(BaseUrl+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate("/login")
      
    } catch (error) {
      console.error(error)
    }
  }
   
  return (
    <div className="navbar bg-base-300 flex flex-wrap md:flex-nowrap">
    <div className="flex-1">
      <Link to={user?"/":"/login"} className="btn btn-ghost text-xl">DevTinder</Link>
    </div>
    {user && <div className="flex-none gap-2 mt-2 md:mt-0">
      <span className="hidden md:inline">Welcome, {user.firstName}</span>
        <div className="dropdown dropdown-end mx-5 flex">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img
                alt="user photo"
                src={user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-12 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between" >
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to={"/connection"}>Connection</Link></li>
            <li><Link to={"/request"}>Request</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
      </div>
    </div>}
  </div>
  )
}

export default Navbar
