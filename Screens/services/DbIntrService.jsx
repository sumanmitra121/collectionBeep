import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import AppLoader from "../Components/AppLoader";
// import LoaderContext from "../Context/Loader/LoaderContext";
import { getStorageData } from "../Lib/Storage";
import { AUTH_TOKEN } from "../Model/Constant";
import { useLoader } from "../Contexts/LoaderProvider";
import { BASE_URL } from "../Config/config";
import { AppLoader } from "../Components/Loader";


const instance = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': "false"
    }
});

const useAxiosLoader = () => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
      const inc = mod => setCounter(c => c + mod);
      const handleRequest = config => (
        console.log("BYPASS_LOG", config.headers.bypass_log),
        inc(config.headers.bypass_log ? 0 : 1), 
        config);
      const handleResponse = response => (
        inc(response?.config?.headers.bypass_log ? 0 : -1), 
      response);
      const handleError = error => {
        inc(-1);
        return Promise.reject(error).then(res=>{
            
        })
    }; 
      // add request interceptors
      const reqInterceptor = instance.interceptors.request.use(handleRequest, handleError);
      // add response interceptors
      const resInterceptor = instance.interceptors.response.use(handleResponse,handleError);
      return () => {
        // remove all intercepts when done
        instance.interceptors.request.eject(reqInterceptor);
        instance.interceptors.response.eject(resInterceptor);
      };
    }, []);
    return counter > 0;
  };

export const GlobalLoader = () => {
    const loading = useAxiosLoader();
    // const {setLoader} = useContext(Load);
     const {setIsLoading} = useLoader();
    
    useEffect(()=>{
        console.log('LOADERSS' + loading)
        setIsLoading(loading)
    },[loading])

    return(
        <>
            {
                loading ? <AppLoader/> : null
            }
        </>
    );
  }

const CallApi = async (flag,api_name,payload,headers,params,bypassLog) =>{
    try{
            const dt = await getStorageData(AUTH_TOKEN);
            const auth_headers = {
                ...headers,
                'Authorization': dt ? `Bearer  ${dt}` : '',
                bypass_log:bypassLog ? bypassLog : false
            }
            if(flag == 1){
                // post..
                return await instance.post(
                    api_name,
                    payload,
                    {
                        headers:auth_headers
                    }
                )
            }
            else if(flag == 2){
                // Delete..
                return await instance.delete(
                    api_name,
                    {
                        headers:auth_headers
                    }
                )
            }
            else{
                return await instance.get(
                    api_name,
                    {
                        headers:auth_headers,
                        params:params
                    }
                )
            }
    }
    catch(err){
        console.log(err)
    }
}

export default CallApi;