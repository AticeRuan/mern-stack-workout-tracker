import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  


  const login= async (email,password)=>{
    setIsLoading(true)
    setError(null)
    const api_url=process.env.REACT_APP_API_BASE_URL

    const response=await fetch(`${api_url}/api/user/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password})
    })
    const json=await response.json()

    if(!response.ok){
        setIsLoading(false)
      setError(json.err)
    }

    if(response.ok){
      
      //save the user to local storage
      localStorage.setItem('user',JSON.stringify(json))
      //update the auth context
      dispatch({type:'LOGIN', payload:json})
      setIsLoading(false)
      
    }
  }

  return {login,error,isLoading}
}