import React, { useState } from 'react'
import Header from './Header'
const Login = () => {
  const[isSignInForm, setIsSingInForm] = useState(true);
  const toggleSignInForm =()=>{
    setIsSingInForm(!isSignInForm)
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/9c41f381-9333-40ac-8d8a-123d2d325d53/web_collection/IN-en-20250120-TRIFECTA-24e4edb3-5579-4e08-a0f0-ef5f84471880_large.jpg' alt='bg-img' />
      </div>
      <form className='absolute p-12 bg-black  w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-80'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"} </h1>
      {isSignInForm &&(<input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-600'/>)}
        <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-600'/>
        <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-600'/>
        <button className='p-4 my-6 bg-red-700 w-full'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}</p>
      </form>
    </div>
  )
}

export default Login
