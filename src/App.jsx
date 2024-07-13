import React from 'react';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom'
import  Signup from './Pages/Signup'

function App() {
  return (
    <>
     < Routes >
      < Route path='/' element={<Home/>} />
      < Route path='/signup' element={<Signup /> } />
     </Routes>
    </>
  );
}

export default App;