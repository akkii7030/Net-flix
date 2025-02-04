import React, { useRef, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    // Validate form input
    const message = checkValidData(email.current?.value, password.current?.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign-Up Logic
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        );
        const user = userCredential.user;

        // Update user's display name
        await updateProfile(user, {
          displayName: name.current.value,
        });

        console.log("User signed up:", user);
        navigate("/signin"); // Redirect to sign-in page after successful sign-up
      } catch (error) {
        setErrorMessage(error.code + " - " + error.message);
      }
    } else {
      // Sign-In Logic
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        );
        console.log("User signed in:", userCredential.user);
        navigate("/browse"); // Redirect to browse page after successful sign-in
      } catch (error) {
        setErrorMessage(error.code + " - " + error.message);
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/9c41f381-9333-40ac-8d8a-123d2d325d53/web_collection/IN-en-20250120-TRIFECTA-24e4edb3-5579-4e08-a0f0-ef5f84471880_large.jpg')" }}
      ></div>

      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input 
            ref={name} 
            type="text" 
            placeholder="Full Name" 
            className="p-4 my-4 w-full bg-gray-600" 
          />
        )}

        <input 
          ref={email} 
          type="text" 
          placeholder="Email Address" 
          className="p-4 my-4 w-full bg-gray-600" 
        />
        <input 
          ref={password} 
          type="password" 
          placeholder="Password" 
          className="p-4 my-4 w-full bg-gray-600" 
        />
        
        <button 
          className="p-4 my-6 bg-red-700 w-full" 
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
