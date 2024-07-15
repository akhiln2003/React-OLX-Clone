import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Context, {  FirebaseContext } from './store/FirebaseContext.jsx'
import {db} from './firebase/Config.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  < FirebaseContext.Provider value={{db}} >
      < Context >
        <Router>
          < ToastContainer />
          < App />
        </Router>
      </Context>
  </FirebaseContext.Provider>
)
