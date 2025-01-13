import React from 'react'
import { BaseUrl } from '../utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../utils/feedSlice';
import Card from './Card';

const Feed = () => {
  const feed= useSelector((store)=>store.feed)

  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
     
      const res= await axios.get(BaseUrl+"/user/feed",{
        withCredentials:true,
    }); 

      dispatch(addfeed(res?.data?.data));

    } catch (error) {
      console.log(error);
      
    }
  }
useEffect(()=>{
   getFeed();

},[]);

  return (
   feed && (<div className='flex justify-center my-10'>
          {feed.map((user, index) => (
        <Card key={index} user={user} />
      ))}
    </div>)
  )
}

export default Feed
