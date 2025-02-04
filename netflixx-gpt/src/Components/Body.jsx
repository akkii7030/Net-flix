import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from "react-router-dom";
import Login from './Login'
import Browse  from './Browse'
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/Browse",
      element: <Browse/>
    },

  ]);
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        const {uid, email, displayName} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName}));
        useNavigate
      }else{
        //User is signed out
        dispatch(removeUser());
      }
    });
  },[]);
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
