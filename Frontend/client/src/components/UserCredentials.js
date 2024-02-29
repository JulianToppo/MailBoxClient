import React, { useState, useEffect } from 'react';
import useCrudForMail from '../hooks/useCrudForMail';

const UserCredentials = (props) => {
  const { getUserData } = useCrudForMail();
  const { showMailMessage } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(showMailMessage.id);
        setData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Perform any clean-up if needed
    };
  }, []);

  console.log(data);

  return (
    <div>
      {data && (
        <div className='flex w-full py-6'>
          <div className='flex flex-col text-xs'>
            <img src='https://www.svgrepo.com/show/335455/profile-default.svg' className='w-6 h-6' alt='User Avatar' />
            <p>FROM:{data.username}</p>
            <p>{data.email}</p>
          </div>
          <hr></hr>
        </div>
      )}
    </div>
  );
};

export default UserCredentials;
