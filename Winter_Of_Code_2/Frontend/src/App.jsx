import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/Signin'
import Guest from './components/Guest'
import EmailVerify from './components/EmailVerify'
import ResetPassword from './components/ResetPassword'
import Signup from './components/Signup'

import { Toaster } from 'react-hot-toast'
import Ide from './components/IDE'

const App = () => {
  return (
    <div>

              <Toaster/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/guest' element={<Guest/>}/>
          <Route path='/ide' element={<Ide/>}/>
          <Route path='/email-verify' element={<EmailVerify/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
