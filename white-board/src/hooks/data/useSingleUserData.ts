import { useState } from 'react';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const useSingleUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSingleUserData = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/users/userdata/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log('Fetched user data:', data); // Log fetched data
      // Ensure the response data matches the UserData interface before setting it
      const userDataFromResponse: UserData = {
        name: data.name,
        email: data.email,
        password: data.password
      };
      setUserData(userDataFromResponse);
      setLoading(false);
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject);
      setLoading(false);
    }
  };

  console.log('Stored user data:', userData); // Log stored data

  return { userData, loading, error, fetchSingleUserData };
};

export default useSingleUserData;

