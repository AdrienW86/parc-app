// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Stocker le token dans le contexte
        localStorage.setItem('token');

        // Mettre à jour l'utilisateur dans le contexte si nécessaire
        updateUser({ token });

        // Rediriger ou effectuer d'autres actions nécessaires
      } else {
        const errorMessage = await response.text();
        console.error('Login error:', errorMessage);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
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
    <UserContext.Provider value={{ user, userAddress, updateUser, fetchUserData, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};