import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const DataContext = createContext();

const DataContextProvider = (props)=>{
    const [token, setToken] = useState("");
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