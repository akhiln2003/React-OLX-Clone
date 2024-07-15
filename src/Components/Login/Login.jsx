import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [ data , setData ] = useState({
    email : '',
    password: ''
  });
  const auth = getAuth();
  const navigate = useNavigate();

  function handilChange(event){
    const { name , value } = event.target;
    setData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  function handileSubmishion(event){
    event.preventDefault();
    const { email , password } = data;
    let emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if( !emailRegex.test( email ) ){
      return toast.error (" Enter Valid Email ")
    }
    if(  password.trim() == '' || password.length < 8 ){ 
      return toast.error('Enter Secure Password ')
    }
    signInWithEmailAndPassword( auth , email , password )
    .then((userCredenshial)=>{
      navigate('/')
    }).catch(error=>{
      if(error.code == 'auth/invalid-email'){
        toast.error('Invalid Email')
      }else if(error.code == 'auth/user-not-found'){
        toast.error('This user is not found')
      }else if(error.code == 'auth/invalid-credential'){
        toast.error('Invalid email or password')
      }else if(error.code == 'auth/wrong-password'){
        toast.error('wrong password')
      }else{
        toast.error("login failed try again")
      }
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handileSubmishion} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            onChange={ handilChange }
            value={data.email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={ handilChange }
            value={ data.password}
          />
          <br />
          <br />
          <button type='submit' >Login</button>
        </form>
        < Link to={'/signup'} ><span>SignUp</span></Link>
      </div>
    </div>
  );
}

export default Login;
