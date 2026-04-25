import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col text-white items-center gap-1 hover:bg-[#131313] duration-200 py-4'>
    <p className='text-xl'>&copy;2025 PIXELCODE. Code Beyond Limits.</p>
    <div className='flex gap-10 p-2'>
        <span className='hover:cursor-pointer hover:text-sky-900 duration-200'>About</span>
        <span className='hover:cursor-pointer hover:text-sky-900 duration-200'>Privacy</span>
        <span className='hover:cursor-pointer hover:text-sky-900 duration-200'>Login</span>
        <span className='hover:cursor-pointer hover:text-sky-900 duration-200'>Contact</span>
    </div>
    </div>
  )
}

export default Footer
