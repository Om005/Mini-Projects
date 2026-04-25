import React, { useState, useEffect, useContext } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";


import { useNavigate } from "react-router-dom";
import { AppContent } from "../../context/Appcontex";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";



export const FloatingNav = ({ navItems, className }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Show navbar if the mouse is within 100px of the top of the page
      if (event.clientY < 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Add mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const {userData, setuserData, backendurl, setisLoggedin} = useContext(AppContent)
  const handlelogout = async(e)=>{
    try{
      e.preventDefault();

      const {data} = await axios.post(backendurl+'/api/auth/logout')

        if(data.success){
          setisLoggedin(false);
          setuserData(false);
          navigate('/')
        }
        else{
          toast.error(data.message)
        }

    }catch(error){
      toast.error(error.message)
    }
  }

  const handleverify = async()=>{{
    try{
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendurl+'/api/auth/send-verify-otp')
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }}
  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 mx-auto transform transition-transform duration-500 ease-in-out z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        visible
          ? "translate-y-5 opacity-100"
          : "-translate-y-10 pointer-events-none",
        "flex max-w-fit border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        navItem.link==='/email-verify' ? <p
        onClick={handleverify}
          key={`link=${idx}`}
          className={cn(
            "relative cursor-pointer dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </p>:<Link
          key={`link=${idx}`}
          to={`${navItem.link}`}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>

      ))}
      {!userData && <Link
        to={"/signin"}
        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
      >
        <span>Login</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
      </Link>}
      {userData && <button
      onClick={handlelogout}
        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
      >
        <span>Log out</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
      </button>}
    </div>
  );
};

