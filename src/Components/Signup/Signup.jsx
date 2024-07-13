import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const [ userData , setUserData ] = useState({
    userName : '',
    email : '',
    mobilNumber : '',
    password : ''
  })
  function handilChanges( event ){
    const { name , value } = event.target;
    setUserData((data) =>({
      ...data , 
      [name] : value
  }))
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
           value={userData.name}
           onChange={handilChanges}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
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
            id="lname"
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
            id="lname"
            name="password"
            value={userData.password}
           onChange={handilChanges}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
