import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {

    const[isCreateAccount, setIsCreateAccount] = useState(false);
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);  
    const {backendURL,  setIsLoggedIn, getUserData} = useContext(AppContext)
    const navigate = useNavigate()
    
    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try{
          if(isCreateAccount){
            // register
            const response =await axios.post(`${backendURL}/register`, {name, email, password})
            if(response.status === 201){
                  navigate("/")
                  toast.success("Account created successfully. Please login to continue.");
            }else{
                toast.error("Email Already exists. Please login to continue.");
            }
          }else{
               const response = await axios.post(`${backendURL}/login`, {email, password})
               if(response.status === 200){
                setIsLoggedIn(true);
                getUserData();
                navigate("/");
                toast.success("Login Successful");  
               }else{
                toast.error("Email or Password is incorrect");
               }

          }
        }catch(err){
            toast.error(err.response.data.message);
        }finally{
            setLoading(false);
           
        }
    }
  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #6a5af9, #8268f9)",
        border: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          <img src={assets.auth_logo} alt="logo" height={30} width={32} />
          <span className="fw-bold fs-4 text-light">AuthSpring</span>
        </Link>
      </div>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">{isCreateAccount ? "Create Account": "Login"}</h2>
        <form onSubmit={onSubmitHandler}>
            {
              isCreateAccount && (
                 <div className="mb-3">
            <label htmlFor="fullName" className="form-lablel">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter Full Name"
              className="form-control"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
              )  
            }
          <div className="mb-3">
            <label htmlFor="email" className="form-lablel">
              Email Id
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-lablel">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              className="form-control"
              required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <Link to="/reset-password" className="text-decoration-none">
            Forgot Password?
            </Link>
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
            <p className="mb-0">
                {
                    isCreateAccount ? 
                    (
                        <>
                        Already have an account?{" "}
                        <span className="text-decoration-underline" style={{cursor:"pointer"}}
                         onClick= {() => setIsCreateAccount(false)}
                            >
                            Login here
                        </span>
                        </>
                    ):(
                        <>
                        Don't have an account?{" "}
                         <span className="text-decoration-underline" style={{cursor:"pointer"}}
                          onClick= {() => setIsCreateAccount(true)}
                          > 
                            Sign Up
                         </span>
                        </>
                    )
                }
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
