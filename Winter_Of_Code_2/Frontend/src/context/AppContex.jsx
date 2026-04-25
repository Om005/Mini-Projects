import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{
    axios.defaults.withCredentials = true;
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setisLoggedin] = useState(false)
    const [userData, setuserData] = useState(false)
    const [files, setfiles] = useState("")

    const getAuthState = async()=>{
        try{
            const {data} = await axios.get(backendurl+'/api/auth/is-auth')
            if(data.success){
                setisLoggedin(true);
                getUserData()
            }
            else{
                if(data.message!=="Not Authorized Login Again.")
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    const getUserData = async()=>{
        try{
            const {data} = await axios.get(backendurl+'/api/user/data')
            data.success?setuserData(data.userData):toast.error(data.message)
            let emaill = data.userData.email
            {
                const {data} = await axios.post(backendurl+'/api/file/get-files', {email: emaill})
                console.log(data)
                setfiles(data.structure)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    const fileData = async()=>{
        try{
            const {data} = await axios.get(backendurl+'/api/file/get-files')
            data.success?setfiles(data.structure):toast.error(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }
    
    useEffect(()=>{
        getAuthState()
        getUserData();
    }, [])

    const value = {
        backendurl,
        isLoggedin, setisLoggedin ,
        userData, setuserData,
        getUserData,
        files, setfiles,
        fileData
    }
    
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}