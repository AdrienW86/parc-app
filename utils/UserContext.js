// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  

  const fetchUserData = async () => {
    try {
     const token =  localStorage.getItem('token')

      if (token) {
        const response = await fetch('/api/profil', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          updateUser(userData);
          setUserAddress(userData.address);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } else {
       // console.error('Token missing');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, userAddress, updateUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};