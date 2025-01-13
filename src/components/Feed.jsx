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

if (!feed) return;

if (feed.length <= 0)
  return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
   feed && (<div className='flex justify-center my-10'>
          <Card user={feed[0]} />
    </div>)
  )
}

export default Feed
