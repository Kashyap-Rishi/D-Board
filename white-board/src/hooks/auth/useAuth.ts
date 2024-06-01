// useAuth.ts
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://drawingboard.onrender.com/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false); 
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;

