import React, { useEffect } from 'react';
import { signOut } from "../utils/firebase";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice"
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constent';
import { toggleGptSeachView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
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
  const handleGptSearchClick =()=>{
    // Toggle  GPT Search
    dispatch(toggleGptSeachView())
  }
  const handleLanguageChange =(e)=>{
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center'>
      <img className='w-44' src={LOGO} alt='logo' />
      {user && (<div className='flex items-center space-x-2 ml-auto'>
        {showGptSearch && (<select className='bg-white text-black  px-4 py-1 rounded' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option> )}

        </select>)}
        <button className='bg-purple-800 rounded-lg text-white py-1 px-4 mx-4 my-2' onClick={handleGptSearchClick}>{showGptSearch ? " Ho12qmePage" : "GPT Search"}</button>
        <img className='w-10 h-10 rounded-full' alt='usericon' src={USER_AVATAR} />
        <button className='text-white bg-red-600 px-4 py-1 rounded' onClick={handleSignOut}>Sign Out</button>
      </div>)}
    </div>
  );
};

export default Header;
