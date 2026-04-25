import React from 'react'
import Navbar from './Navbar'
import Manager from './Manager'
import Footer from './Footer'
import { useLocation } from 'react-router-dom';

const Merge = () => {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
    <Navbar/>
    <div className='min-h-[83vh] bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f/0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
    <Manager data={data}/>
    </div>
    <Footer/>
    </>
  )
}

export default Merge
