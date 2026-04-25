import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Signin = () => {
  const navigate = useNavigate();
  useGSAP(() => {
    gsap.from(".main-box", {
      x: 550,
      duration: 0.5,
    });
  });
  const [form, setform] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const showPass = () => {
    let e = document.querySelector("#password");
    if (e.type == "password") {
      e.type = "text";
      document.querySelector(".sp").src = "/imgs/hidden.png";
    } else {
      e.type = "password";
      document.querySelector(".sp").src = "/imgs/eye.png";
    }
  };
  const signin = async () => {
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(form), // Assuming 'form' contains your email and password data
      })
      .then((response) => response.text()) // Convert response to text
      .then(async(data) => {
        if (data == "1") {
          navigate("/passwords", { state: { data: form.email } });
          return;
        } 
        let key1 = await import.meta.env.VITE_KEY;
        let key = `${key1}`
        console.log(key)
        let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${form.email}`;
        let fetch_result = await fetch(url);
        let response = await fetch_result.json();
        if (
          response.reason != "valid_mailbox" ||
          response.smtp_check != true ||
          response.state != "deliverable"
        ) {
          toast("Invalid email id", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          }
          else{
            toast(data, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='h-screen w-screen bg-[url("imgs/bgimg.jpg")] bg-center bg-cover flex justify-center items-center'>
        <div className="h-[55vh] w-[75vw] bg-cu_black backdrop-blur-lg rounded-sm flex">
          <div className="px-12 py-14 h-[60vh] w-[32vw] bg-slate-100 absolute left-16 -bottom-5 shadow-black shadow-2xl main-box">
            <h1 className="text-2xl ml-1 text-orange-600">SIGN IN</h1>
            <div className="mt-10">
              <div className="relative w-full max-w-xs">
                <input
                  onChange={handleChange}
                  value={form.email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="bg-slate-100 w-full px-3 py-2 pr-10 border-b border-gray-300 text-gray-600 focus:outline-none focus:border-gray-500 placeholder-gray-400"
                />
                <span className="absolute right-0 top-0 mt-3 mr-3 text-gray-400">
                  &#9993;
                </span>
              </div>
              <div className="relative w-full max-w-xs mt-4">
                <input
                  onChange={handleChange}
                  value={form.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-slate-100 w-full px-3 py-2 pr-10 border-b border-gray-300 text-gray-600 focus:outline-none focus:border-gray-500 placeholder-gray-400"
                />
                <span
                  onClick={() => showPass()}
                  className="absolute right-0 top-0 mt-3 mr-3 text-gray-400 cursor-pointer"
                >
                  <img className="sp" width={20} src="imgs/eye.png" alt="" />
                </span>
              </div>

              <button
                onClick={signin}
                className="px-10 py-2 rounded-sm mt-12 bg-orange-600 text-white"
              >
                SIGN IN
              </button>
            </div>
          </div>
          <div className="w-[50%] flex justify-center items-center p-[95px]">
            <div className="text-white">
              <h1 className="text-[45px] line-1 leading-tight">
                Have an account?
              </h1>
              <p className="text-lg">
                Sign in to securely store and manage your passwords
              </p>
              <button className="px-10 py-2 border border-white rounded-md my-5">
                SIGN IN
              </button>
            </div>
          </div>
          <div className="w-[50%] flex justify-center items-center p-[95px]">
            <div className="text-white">
              <h1 className="text-[45px] line-1 leading-tight">
                Don't Have an account?
              </h1>
              <p className="text-lg">
                Create an account to securely store and manage your passwords
              </p>
              <div className="mt-8">
                <Link
                  to={"/signup"}
                  className="px-10 py-2 border border-white rounded-md my-5"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
