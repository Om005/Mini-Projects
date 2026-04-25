import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Signin from './components/Signin'
import Merge from './components/Merge'
import Signup from './components/Signup';

import { u_email } from './contex/contex';

function App() {
  const [temp, settemp] = useState("")
  return (
    <>
    <u_email.Provider value={{temp, settemp}}>

    <Router>
            <Routes>
                <Route path="/" exact element={<Signin/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/passwords" element={<Merge/>} />
            </Routes>
      </Router>
    </u_email.Provider>
  
    </>
  )
}

export default App
