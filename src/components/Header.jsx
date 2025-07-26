import React, { use, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Header = () => {
    const {userData} = useContext(AppContext);
  return (
   <div className="text-center d-flex flex-column align-items-center justify-content-center py-3 px-3" style={{minHeight: '80vh'}}>
         <img src={assets.biometric_home} alt="header" width={120} className='mb-4' />

            <h5 className="fw-semibold">
                Hey {userData ? userData.name : 'Developer'} <span role='img' aria-label='wave'>👋</span>
            </h5>
            <h1 className="fw-bold display-5 mb-3">Welcome To Our Product</h1>

            <p className="text-muted fs-5 mb-4" style={{maxWidth:"500px"}}>
                Lets's start with a quick tour of our product. We will guide you through the features and functionalities that will help you get the most out of it.
            </p>

            <button className="btn btn-outline-dark rounded-pill px-4 py-2">
                Get Started
            </button>
   </div>
  )
}

export default Header