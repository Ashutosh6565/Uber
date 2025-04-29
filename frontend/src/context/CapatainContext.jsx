import { createContext,useState, useContext } from "react";

 export const CapatainDataContext = createContext();


// export const useCaptain = ( ) => {
//     const context = useContext(CapatainDataContext)

//     if(!context){
//         throw new Error('useCaptain must be used within a CapatainProvider')
//     }
//     return context;

// }


const CapatainContext = ({children}) => {
    const [captain, setCaptain] = useState();
    const[isloading, setLoading] = useState(false);
    const [error, setError] = useState(null);   


    const updateCapatain = ({children}) => {
        setCaptain(captain)
    };

    const value = {
        captain,
        setCaptain,
        isloading,
        setLoading,
        error,
        setError,
        updateCapatain
    };

    return (
        <CapatainDataContext.Provider value={value}>
            {children}
        </CapatainDataContext.Provider>
    )
}
    export default CapatainContext;