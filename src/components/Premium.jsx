import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../utils/constant'

const Premium = () => {

    const [isUserPremium,setIsUserPremium]= useState(false);

    useEffect(()=>{verifyPremiumUser();

    },[]);

    const verifyPremiumUser= async ()=>{
        const res= await axios.get(BaseUrl+"/premium/varify",{
            withCredentials:true
        })

        if(res.data.isPremium){
            setIsUserPremium(true);
        }
    }

   const handleBuyClick=async (type)=>{
        const order= await axios.post(BaseUrl+"/payment/create",
        {
            membershipType: type
        },{withCredentials:true})

        const {amount,orderId,firstName,lastName,email,keyId,currency} = order.data 

        // it should open razorpay dialog box

        const options = {
            key: keyId, 
            amount, 
            currency,
            name: 'DevTinder',
            description: 'Connect to Developers',
            order_id: orderId, 
            
            prefill: {
              name: firstName + " " + lastName,
              email,
              contact: '9999999999'
            },
            theme: {
              color: '#F37254'
            },
            handler: verifyPremiumUser
          };

        const rzp = new window.Razorpay(options);
        rzp.open();
   }

  return (
    isUserPremium? (
        <div className='text-center m-4 text-xl md:text-2xl text-cyan-950'>You are already a premium user</div>
    ) :
    
    <div className='m-10'>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-blue-100 rounded-box grid h-80 flex-grow place-items-center">
            
          <h1 className='font font-bold text-3xl text-cyan-950'>Silver Membership</h1>  
          <ul className='text-cyan-900'>
            <li>- chat with other people</li>
            <li>- 100 connection request per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months validity</li>
          </ul>
          <button className='btn btn-secondary'
            onClick={()=>handleBuyClick("silver")}
          >
            Buy Silver
          </button>
            
            
        </div>
        <div className="divider lg:divider-horizontal">OR</div>

        <div className="card bg-blue-100 rounded-box grid h-80 flex-grow place-items-center">
            
            
        <h1 className='font font-bold text-3xl text-cyan-950'>Gold Membership</h1>  
          <ul className='text-cyan-900'>
            <li>- chat with other people</li>
            <li>- unlimited connection per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months validity</li>
          </ul>
          <button className='btn btn-secondary'
            onClick={()=>handleBuyClick("gold")}
          >
            Buy Gold
          </button>
            
            
        </div>
        </div>
    </div>
  )
}

export default Premium
