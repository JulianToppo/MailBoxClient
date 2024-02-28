import { useEffect } from 'react';

const useApiCall = (url,show,OnSuccess) => {
 console.log("api called",url)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        
        const responseData = await response.json();
        if (response.ok) {
        
          OnSuccess(responseData)
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const timer = setTimeout(() => {
     show && fetchData(); 
    }, 2000);

   
    return () => clearTimeout(timer);
  }, [url,show,OnSuccess]);

};

export default useApiCall;
