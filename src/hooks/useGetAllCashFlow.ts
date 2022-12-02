import React, { useEffect } from "react";
import { useState } from "react";


  export const useGetAllCashFlow = (url: string)=> {
    const [response, setResponse] = useState<any>([]);
    const token = localStorage.getItem('token')
    
    const getAPIData = async () => {
      try {
        const apiResponse = await fetch(url,{
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const json = await apiResponse.json();
        setResponse(json.data);
      } catch (error) {
      }
    };
    useEffect(() => {
        getAPIData();
      }, []);
      return response;
    }