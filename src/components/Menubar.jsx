import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Menubar = () => {
    const navigate = useNavigate();
    const{userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);
    const[dropdownOpen, setDropdownOpen] = useState(false);
    const dropDownRef = useRef(null);

    useEffect( () =>{
        const handleClickOutside = (event) =>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])



    const handleLogout = async() =>{
         try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${backendURL}/logout`)
            if(response.status === 200){
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/")
                toast.success("Logout Successful");
            }
         } catch (error) {
            toast.error(error.response.data.message || "Logout failed");
         }
    }

    const sendVerificationOtp = async() =>{
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${backendURL}/send-otp`)
            if(response.status === 200){
                navigate("/email-verify");
                toast.success("OTP sent to your email. Please verify to continue.");
            }else{
                toast.error("Unable to send OTP. Please try again later.");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Error sending OTP");
        }
    }


  return (
    <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
            <img src={assets.auth_logo} alt="logo" width={32} height={32}/>
            <span className="fw-bold fs-4 text-dark">AuthSpring</span>
        </div>
 
           {
            userData ? (
                 <div className="postion-relative" ref={dropDownRef}>
                    <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                        userSelect: "none",
                    }} onClick={() => setDropdownOpen((prev) => !prev)}>
                            {userData.name[0].toUpperCase()}
                    </div>
                    {
                        dropdownOpen && (
                            <div className="position-absolute shadow bg-white rounded p-2"
                            style={{
                                top: "50px",
                                right: 0,
                                zIndex: 100
                            }}>
                             {
                                !userData.accountVerified && (
                                    <div className="dropdown-item py-1 px-2"
                                    style={{cursor:"pointer"}} onClick={sendVerificationOtp}>
                                        Verify Email
                                    </div>
                                )
                             }
                             <div className="dropdown-item py-1 px-2 text-danger"
                             style={{cursor:"pointer"}}
                             onClick={handleLogout}>
                                Logout
                             </div>
                            </div>
                        )
                    }
                 </div>
            ):(
                  <div className="btn btn-outline-dark rounded-pill px-3" onClick={() => navigate('/login')}>
            Login <i className="bi bi-arrow-right ms-2"></i>
        </div>
            )
           }
       
    </nav>
  )
}

export default Menubar