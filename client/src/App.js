import React from 'react'
import { Routes, Route } from 'react-router-dom'

import RequireAuth from './components/RequireAuth'
import AppNavbar from './components/AppNavbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Profile from './components/Profile'

const App = () => {

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RequireAuth />} >
          {/* Private routes */}
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App