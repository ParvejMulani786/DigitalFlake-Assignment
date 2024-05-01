import React from 'react'
import logo from '../../../assets/logo.png';

export default function Dashboard() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='item flex flex-col items-center text-center'> 
        <div className='profile'> 
          <img src={logo} alt="avatar" width={"150px"} height={'50px'} />
        </div>
        <div className="title">
          <span className='text-xl text-center text-gray-500'>
            Welcome to Digitalflake Admin
          </span>
        </div>
      </div>
    </div>
  )
}
