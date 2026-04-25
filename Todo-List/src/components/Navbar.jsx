const Navbar = () => {
  return (
    <nav className='flex justify-between bg-c_white text-black py-3'>
        <div className="logo">
            <span className='font-bold text-xl mx-10'>iTask</span>
        </div>
        <ul className="flex gap-9 mx-9">
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
