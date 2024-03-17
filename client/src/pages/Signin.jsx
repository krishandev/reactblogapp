import React, { useState } from 'react'
import {Alert, Button, Label, TextInput} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx'
const Signin = () => {

const [formData, setFormData]=useState({});
// const [errorMessage, setErrorMessage]=useState(null);
// const [loading, setLoading]=useState(false);
const {loading, error:errorMessage}=useSelector(state=>state.user);
const dispatch=useDispatch();
const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value.trim()})
   };

   console.log(formData)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password || !formData.email==='' || !formData.password===''){
      // return setErrorMessage("Please fill all fields");
      return dispatch(signInFailure("Please fill all Fields"))

    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data.success===false){
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));

      }
      // setLoading(false);
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false)
      dispatch(signInFailure(error.message))
    }

  }

  
  return (
    <div className='flex md:flex-row max-w-3xl mx-auto m-5'>
        <div className='flex-1 flex items-center justify-center flex-col gap-3'>
        <Link to='/'>
            <span className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-1 py-1 font-bold rounded text-3xl'>Krishan's</span>
            <span className=' text-3xl font-bold'>Blog</span>
            </Link>
            <p>
              This is Demo Project. You can signIn with email and password
            </p>
        </div>


        <div className='flex-1'>
        <form className=' flex flex-col gap-3' onSubmit={handleSubmit}>
          
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
                ):('Sign In')
              }
            </Button>
          </form>
          <div>
            <OAuth/>
          </div>
          <div className='mt-1'>
            <p>Don't Have Account? <Link to='/signup' className=' text-blue-700'>Sign Up</Link></p>
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

export default Signin