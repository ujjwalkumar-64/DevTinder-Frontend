import React from 'react'

const Card = ({user}) => {
    const{firstName,lastName,photoUrl,about,age,gender,skills} = user
    
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " "+ lastName}</h2>
   { age && gender  && (<p>{gender + " " + age} </p>)}
    <p>{about} </p>
    <p>{skills}</p>

    <div className="card-actions justify-center my-4">
      <button className="btn btn-accent">Ignored</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default Card
