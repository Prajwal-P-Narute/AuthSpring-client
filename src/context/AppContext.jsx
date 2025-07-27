import { createContext, useEffect, useState } from "react";
import AppConstants from "../util/constants.js";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendURL = AppConstants.Backend_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async() =>{
        try {
            const response = await axios.get(backendURL+"/profile", { withCredentials: true });
            console.log(response.data)
           
            if(response.status === 200){

                setUserData(response.data);
            }else{
                toast.error("Unable to retrive profile");
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAuthStatus = async() =>{
        try {
            const response = await axios.get(`${backendURL}/is-authenticated`);
            if(response.status === 200 && response.data === true){
                setIsLoggedIn(true)
                await getUserData()

            }else{
                setIsLoggedIn(false)
            }
        } catch (error) {
           console.error(error);
        }
    }

    useEffect(() =>{
        getAuthStatus()
    }, [])

    const contextValue = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }
 
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}