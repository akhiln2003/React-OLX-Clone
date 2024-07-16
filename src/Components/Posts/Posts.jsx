import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {  useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/FirebaseContext';
import {collection, getDocs} from 'firebase/firestore';
import {productContext} from '../../store/PostContext'

function Posts() {

  const { db } = useContext(FirebaseContext);
  const [ products , setProducts] = useState([]);
  const navigate = useNavigate();
  const {productDetails,setProductDetails} = useContext(productContext)
  useEffect(()=>{
    const collectionRef = collection( db , 'products')
    getDocs( collectionRef).then((snapshot)=>{
      const allProducts = snapshot.docs.map((value)=>{
        return {
          ...value.data(),
          id:value.id
        }
      })
      setProducts(allProducts)
    })
  },[db]);



  function handleClick(product){
    
    setProductDetails(product);
    navigate('/view')
  }


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(product=>{
              return <div
              key={product.url}
              className="card"
              onClick={()=> handleClick(product)}
            >
              {/* <div className="favorite"  >
                <Heart></Heart>
              </div> */}
              <div className="image">
                <img src={product.url} alt="productImage"  />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
