import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../store/AuthProvider'
import { profile } from '../utils/ApiFunctions';

const Profile = () => {

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    try {
      const response = profile(userId);
      setUser(response);
      console.log(response)
    }
    catch(error){
      setErrorMessage(error);
    }
    setErrorMessage('')
    
  }, [])

  return (
    <div className='container bg-success bg-opacity-10 text-center'>
      <h2>User Information</h2>
      <div className='container border bg-white'>
        <div>
        </div>
        <table className='table'>
          <tr>
            <th>ID</th>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Profile
