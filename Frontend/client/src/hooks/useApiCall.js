import { useEffect } from "react";

const useApiCall = () => {
  const fetchData = async (url,requestParam,) => {
    try {
      const response = await fetch(url, requestParam
      );

      const responseData = await response.json();
      if (response.ok) {
        return responseData;
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {fetchData};
 
};

export default useApiCall;
