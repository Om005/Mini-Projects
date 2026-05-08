import React from 'react'
import "../Fonts.css"
const Navbar = () => {
  return (
    <>
    <nav className="fixed w-full z-[99] px-12 py-5 flex items-center justify-between inconsolata" >
        <div className="logo">
            <img className='border border-slate-500 rounded-lg cursor-pointer' width={50} src="imgs/logo.png" alt="" />
        </div>
        <div className="links flex gap-20">
            {["Services", "About Me", "Contact Me"].map((item, index)=>(
                <a key={index} className='text-lg font-semibold'>{item}</a>
            ))}
        </div>
    </nav>
    </>
  )
}

export default Navbar
