import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Header from './components/Header'
import About from './pages/About'
import FooterCompo from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'


const App = () => {
  return (
    <BrowserRouter>
        <Header/>

      <Routes>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-a-post' element={<CreatePost/>}/>
        </Route>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    <FooterCompo/>
      
    </BrowserRouter>

  )
}

export default App