import { StickyNavbar } from './StickyNavbar'
import { BackgroundBeamsDemo } from './BackgroundBeamsDemo'
import { HeroScrollDemo } from './HeroScrollDemo'
import { CardHoverEffectDemo } from './CardHoverEffectDemo'
import { FloatingNavDemo } from './FloatingNavDemo'
// import './App.css'



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Footer'

function Home() {

  return (
    <div>
      {/* <StickyNavbar/> */}
      <FloatingNavDemo/>
      <BackgroundBeamsDemo/>
      <div className='bg-[#0A0A0A]'>

      <HeroScrollDemo/>
      </div>
      <div className='bg-[#0A0A0A]'>

      <CardHoverEffectDemo/>
      <Footer/>
      </div>
    </div>

  )
}

export default Home
