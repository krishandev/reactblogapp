import React, { useState } from 'react'
import {Alert, Button, Label, TextInput} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const Signup = () => {
const [formData, setFormData]=useState({});
const [errorMessage, setErrorMessage]=useState(null);
const [loading, setLoading]=useState(false);
const navigate=useNavigate();
  const handleChange=(e)=>{
   setFormData({...formData, [e.target.id]:e.target.value.trim()})
  };
  console.log(formData)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch('/api/auth/signup',
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data.success===false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }

  }
  return (
    <div className=' max-w-3xl mx-auto flex flex-col md:flex-row mt-20 gap-3 p-3'>
        <div className=' flex-1 flex items-center justify-center flex-col gap-3'>
        <Link to='/'>
            <span className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-1 py-1 font-bold rounded text-3xl'>Krishan's</span>
            <span className=' text-3xl font-bold'>Blog</span>
            </Link>
            <p>
              This is Demo Project. You can signup with username, email and password
            </p>
        </div>

        <div className=' flex-1'>
          <form className=' flex flex-col gap-3' onSubmit={handleSubmit}>
            <div>
              <Label>User Name</Label>
              <TextInput type='text' placeholder='User Name' id='username' onChange={handleChange}/>
            </div>

            <div>
              <Label>Email</Label>
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
            </div>

            <div>
              <Label>Password</Label>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <Button className='bg-gradient-to-r from-fuchsia-500 to-cyan-500' type='submit' disabled={loading}>
              {
                loading?(
                  <>
                  <span>Loading...</span>
                  </>
                ):('Sign Up')
              }
            </Button>

          </form>
          <div>
            <OAuth/>
          </div>
          <div className='mt-1'>
            <p>Have an Account? <Link to='/signin' className=' text-blue-700'>Sign In</Link></p>
          </div>
          {
            errorMessage &&(
              <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
    </div>
  )
}

export default Signup