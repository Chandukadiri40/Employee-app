import React, { useEffect } from 'react'
import "./UpdateUser.css";
import { useState } from 'react'
import Form from "react-bootstrap/Form"
import { Button } from 'react-bootstrap/'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const navigate=useNavigate();
  const {id}=useParams();

   const[formData,setFormData]=useState({
          name:"",
          mail:"",
          phone:"",
          department:""
      });
      const handleInputChange=(event)=>{
          const{name,value}=event.target;
          setFormData({
              ...formData,
              [name]:value,
  
          })
  }
  useEffect(()=>{
    const fetchEmployee=async()=>{
      try{
        const response=await fetch(`http://localhost:8080/api/employee/${id}`);
        const data=await response.json();
        setFormData(data);
      }
      catch(error){
        console.error("Error fetching user:",error.message);
      }
    }
    fetchEmployee();

  },[id]);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`http://localhost:8080/api/employee/${id}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(formData),

     } )
     const data=await response.json();
      console.log("user updated",data);
      navigate("/")

    }catch(error){
      console.error("Error update user",error.message());
    }
  }
  return (
   
 <div className='center-form'>
        <h1>Edited Employee</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' name='name' placeholder='enter name' value={formData.name} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='email' name='email' placeholder='enter email' value={formData.email} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' name='phone' placeholder='enter phone' value={formData.phone} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' name='department' placeholder='enter department' value={formData.department} onChange={handleInputChange} required/>
            </Form.Group>
            <Button variant="primary" type='submit' className='w-100'>Update employee</Button>
        </Form>      
    </div>
  )
}

export default UpdateUser
