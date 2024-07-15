import React, { useState , useContext  } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword , getAuth, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';
export default function Signup() {
  const [ userData , setUserData ] = useState({
    userName : '',
    email : '',
    mobilNumber : '',
    password : ''
  });
  const { db } = useContext( FirebaseContext );
  const navigate = useNavigate()
  const auth = getAuth();
  function handilChanges( event ){
    const { name , value } = event.target;
    setUserData((data) =>({
      ...data , 
      [name] : value
  }));
  }
  const handilSubmishion = ( event ) =>{
    event.preventDefault();
    const { userName , email , mobilNumber , password } = userData
    const userNameRegex =  /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if( !userNameRegex.test(userName)){
      return toast.error( 'Enter Valid User Name')
    }
    if( !emailRegex.test( email ) ){
      return toast.error (" Enter Valid Email ")
    }
    if( !phoneRegex.test(mobilNumber) ){
      return toast.error('Enter Valid Number')
    }
    if(  password.trim() == '' || password.length < 8 ){ 
      return toast.error('Enter Secure Password ')
    }
    createUserWithEmailAndPassword( auth , email , password)
    .then( (userCredential)=>{
      const user = userCredential.user;
      return updateProfile( user , {
         displayName:userName
      })
    }).then(()=>{
      addDoc(collection(db,'users'),{
        id:auth.currentUser.uid,
        userName :userName,
        mobilNumber :mobilNumber
      })
    }).then(()=>{
      navigate('/login')
  }).catch((error)=>{
      if(error.code == 'auth/email-already-in-use'){
        toast.error('Email already in use')
      }else{
        console.log(error);
         toast.error('server under maintainence')
      }
    })


  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handilSubmishion} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="userName"
            name="userName"
           value={userData.name}
           onChange={handilChanges}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handilChanges}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            id="mobilNumber"
            name="mobilNumber"
            value={userData.mobilNumber}
           onChange={handilChanges}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={userData.password}
           onChange={handilChanges}
          />
          <br />
          <br />
          <button type='submit' >Signup</button>
        </form>
        < Link to={'/login'} ><span>Login</span></Link>
      </div>
    </div>
  );
}
