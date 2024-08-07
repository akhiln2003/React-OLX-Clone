import React, { useContext, useEffect } from 'react';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom'
import  Signup from './Pages/Signup'
import Login from './Components/Login/Login';
import { Context } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Create from "./Pages/Create"
import View from './Pages/ViewPost'
import Product from './store/PostContext';
function App() {
  const { setUser } = useContext( Context );
  let auth = getAuth(); 
  useEffect(()=> {
    let unSubscribe = onAuthStateChanged( auth , (user)=>{
      if( user ){
        setUser( user );
      }else{
        setUser( null );
      }
    })
    return () =>{ if(unSubscribe) unSubscribe()}
  },[]);
  return (
    <>
    < Product >
     < Routes >
      < Route path='/' element = { < Home/>} />
      < Route path='/signup' element = { < Signup /> } />
      < Route path='/login' element = { < Login /> } />
      < Route path='/create' element = { < Create />} />
      < Route path='/view' element = { < View />} />
     </Routes>
    </Product>
    </>
  );
}

export default App;