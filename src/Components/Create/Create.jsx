import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { toast } from 'react-toastify';
import {db, storage} from '../../firebase/Config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/FirebaseContext';

const Create = () => {
  const [ name , setName ]= useState('');
  const [ category , setCategory ]= useState('');
  const [ price , setPrice ]= useState('');
  const [ image , setImage ]= useState(null);
  const navigate = useNavigate();
  const{ user } = useContext(Context);
  const dates = new Date(Date.now())
  function handilSubmit(){
    const priceRegex = /^\d+(\.\d+)?$ /
    if( name.trim() == '' || name.length < 2 ) return toast.warning("Enter Valid name ");
    if( category.trim() == '' || category.length < 2 ) return toast.warning("Enter valid Category");
    if( priceRegex.test( price ) )return toast.warning( " Enter valid Price ");

    const storageRef = ref( storage , `images/${image.name}`)
    uploadBytes( storageRef , image ).then((url)=>{
      getDownloadURL( storageRef ).then((url)=>{
        addDoc( collection ( db , 'products' ),{
          name ,
          category , 
          price ,
          url , 
          userid:user.uid,
          createdAt: dates.toISOString().split('T')[0]
        })
      })
    })
    navigate('/')
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form  >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}

            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="text" 
            id="price" 
            name="Price"
            value={price} 
            onChange={(e)=>setPrice(e.target.value)}
            />
            <br />
          </form>
          <br />
          <img 
          alt="Posts" 
          width="200px" 
          height="200px" 
          src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={handilSubmit} >upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
