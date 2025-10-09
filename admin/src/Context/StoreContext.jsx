import { createContext } from "react";
import { useContext } from "react";


export const StoreContext= createContext()

export const StoreContextProvider=({children})=>{
    const backend_url=`https://mern-ecommerce-sep-api.vercel.app`
    const value={backend_url}
    return <StoreContext.Provider value={value}>
        {children}
    </StoreContext.Provider>
}

export const useStoreContext=()=>{
    return useContext(StoreContext)
}
