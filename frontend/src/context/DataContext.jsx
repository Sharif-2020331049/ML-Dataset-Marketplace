import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const DataContext = createContext();

const DataContextProvider = (props)=>{
    // In your DataContext.jsx or App.jsx
const [token, setToken] = useState(localStorage.getItem('token') || "");
    const navigate = useNavigate();

    const value = {
        token,
        setToken, 
        navigate
    }

    return(
        <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
    );
};

export default DataContextProvider;