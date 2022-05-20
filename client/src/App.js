import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import RequireAuth from './components/RequireAuth'
import AppNavbar from './components/AppNavbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import User from './components/User'

const App = () => {

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/home' element={<Navigate replace to='/' />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RequireAuth />} >
          {/* Private routes */}
          <Route path='/users/:username' element={<User />} />
        </Route>
      </Routes>
    </>
  )
}

export default App