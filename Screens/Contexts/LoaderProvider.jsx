import React,{createContext,useState,useContext} from "react";

const LoaderContext = createContext()

export const LoaderProvider = ({ children }) =>{
    const [ isLoading, setIsLoading ] = useState(false)
    const [ loaderText, setLoaderText ] = useState('')

    const showLoader = (text = '') => {
        setLoaderText(text);
        setIsLoading(true);
      };

      const hideLoader = () => {
        setIsLoading(false);
        setLoaderText('');
      };

      return (
        <LoaderContext.Provider value={{ isLoading, loaderText, showLoader, hideLoader,setIsLoading }}>
          {children}
        </LoaderContext.Provider>
      );
    };

    export const useLoader = () => useContext(LoaderContext);
