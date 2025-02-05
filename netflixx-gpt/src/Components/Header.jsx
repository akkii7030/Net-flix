import React, { useEffect } from 'react';
import { signOut } from "../utils/firebase";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice"
import { LOGO, USER_AVATAR } from '../utils/constent';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {

      navigate("/error")
    });
  };
  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        const {uid, email, displayName,photoURL} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL: photoURL}));
        navigate("/browse")
      }else{
        //User is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });
    // Unsubscribe when components unmounts
    return () => unsubscribe();
  },[]);
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center'>
      <img className='w-44' src={LOGO} alt='logo' />
      {user && (<div className='flex items-center space-x-2 ml-auto'>
        <img className='w-10 h-10 rounded-full' alt='usericon' src={USER_AVATAR} />
        <button className='text-white bg-red-600 px-4 py-1 rounded' onClick={handleSignOut}>Sign Out</button>
      </div>)}
    </div>
  );
};

export default Header;
