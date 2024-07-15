import React from 'react';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom'
import  Signup from './Pages/Signup'
import Login from './Components/Login/Login';

function App() {
  return (
    <>
     < Routes >
      < Route path='/' element = { < Home/>} />
      < Route path='/signup' element = { < Signup /> } />
      < Route path='/login' element = { < Login /> } />
     </Routes>
    </>
  );
}

export default App;