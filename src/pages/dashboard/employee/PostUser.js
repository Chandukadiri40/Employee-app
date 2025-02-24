import React, { useState } from 'react'
import "./PostUser.css"
import Form from "react-bootstrap/Form"
import { Button } from 'react-bootstrap/'
import { useNavigate } from 'react-router-dom'

const PostUser = () => {

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
const navigate=useNavigate();

const handleSubmit=async(e)=>{
    e.preventDefault();

    console.log(formData)
    alert("User posted successfully")
    try{
        const response=await fetch("http://localhost:8080/api/employee",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(formData)

        });
        const data=await response.json();
        console.log("Employee created :" ,data)
        navigate("/")
    }
    catch{
        console.log("Error creating employee:",console.error.message);
        

    }
}

  return (
    <div className='center-form'>
        <h1>Post new Employee</h1>
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
            <Button variant="primary" type='submit' className='w-100'>Post employee</Button>
        </Form>
      
    </div>
  )
}

export default PostUser
