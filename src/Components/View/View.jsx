import React,{useEffect,useState,useContext} from 'react';
import Header from '../Header/Header';
import { productContext } from '../../store/PostContext';

import './View.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs,query,where } from 'firebase/firestore';
function View() {
  const navigate = useNavigate()
  const [userDetails,setUserDetails] = useState(null)
  const {productDetails} = useContext(productContext)
  const {db} = useContext(FirebaseContext)

  useEffect(()=>{
    if(productDetails== null){
      navigate('/')
    }
    const {userid} = productDetails
    const q = query(collection(db,'users'),where('id','==',userid))
    getDocs(q).then((snapshot)=>{
      snapshot.forEach((doc)=>{
        console.log(doc.data);
        setUserDetails(doc.data())
      })
    })
  },[productDetails,db])

  return (
    <>
    <Header/>
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetails.url}
          alt=""
        />
      </div>
      {userDetails&&<div className="rightSection">
        <div className="productDetails">
          <p> <span>Price : </span> &#x20B9; {productDetails.price} </p>
          <span>  {productDetails.name}</span>
          <p> Category :  {productDetails.category}</p>
          <span> Uploded At :  {productDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p><span>Name : </span>{userDetails.userName}</p>
          <p> <span>Condact : </span> {userDetails.mobilNumber}</p>
        </div>
      </div>}
    </div>
    </>
  );
}
export default View;