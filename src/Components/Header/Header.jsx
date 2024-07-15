import React, { useContext, useEffect } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';
import  { Context } from '../../store/FirebaseContext'
import { getAuth, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
function Header() {
  const { user } = useContext(Context);
  useEffect(()=>{

  })
  const navigat = useNavigate();
  function Logout(){
    const auth = getAuth()
    console.log(auth);
    Swal.fire({
      text:'Do you want to Logout',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes'
    }).then( (result)=>{
      if( result.isConfirmed ){

        signOut(auth).then(()=>{
          navigat('/login');
        })
      }
    } )
  }


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span>{user?`${user.displayName}`:<Link to='/login'><span>Login</span></Link>}</span>    
         <hr />
        </div>
        {user && <button style={{ backgroundColor: '#FF0000', borderRadius: '8px', padding: '10px', border: 'none', color: 'white' }}
        onClick={Logout}>
          Logout
        </button>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
