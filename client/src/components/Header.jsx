import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice.js'
import {signOutSuccess} from '../redux/user/userSlice.js'

const Header = () => {

    const path=useLocation().pathname;
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {currentUser}=useSelector(state=>state.user)
    const {theme}=useSelector((state)=>state.theme)
    const [searchTerm, setSearchTerm]=useState('')
    
    console.log(searchTerm)
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const searchTermFromUrl=urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
      }
    }, [location.search])
    const handleSignout=async()=>{
        try {
          const res=await fetch('/api/user/signout', {
            method:'POST'
          });
          const data=await res.json();
          if(!res.ok){
            console.log(data.message)
          }else{
            dispatch(signOutSuccess())
          }
        } catch (error) {
          console.log(error.message)
        }
      }

      const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm )
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
      }

  return (
    <div>
        <Navbar className='border-b-2'>
            <Link to='/'>
            <span className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-1 py-1 font-semibold rounded'>Krishan's</span>
            Blog
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            </form>
            <Button className='lg:hidden' color='gray' pill><AiOutlineSearch/></Button>
            <div className='flex gap-2 md:order-2'>
          <Button className='hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
            {
                theme==='light' ? <FaSun/> : <FaMoon/>
            }
          
          </Button>
          {
            currentUser ?(
                <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={handleSignout}>
                        Sign Out
                    </Dropdown.Item>
                    
                </Dropdown>
            ):(
                <Link to='/signin'>
                <Button className='bg-gradient-to-r from-fuchsia-500 to-cyan-500'>Sign In</Button>
                </Link>
            )
          }
          
          <Navbar.Toggle/>
            </div>

            <Navbar.Collapse>
                <Navbar.Link active={path==='/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/projects'} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>


        </Navbar>
    </div>
  )
}

export default Header