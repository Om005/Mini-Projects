import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation()
  const newData = location.state?.data
  const [showDropdown, setshowDropdown] = useState(false)
  const navigate = useNavigate()
  const logout = ()=>{
    navigate("/")
  }
  const show = ()=>{
    setshowDropdown(!showDropdown)
  }
  return (
    <nav className='bg-black h-[76px]'>
        <div className="flex items- justify-between py-3 px-6 mycontainer text-white">

        <div className="logo font-bold mt-2">
            <h1 className='text-2xl hover:cursor-pointer'>

            <span className='text-green-700'>&lt;</span>

            Pass<span className='text-green-700'>OP/&gt;</span>
            </h1>
        </div>
        <div className="git text-white">
            <button onClick={logout} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2">Log out</button>
        </div>
        </div>

    </nav>
  )
}

export default Navbar
