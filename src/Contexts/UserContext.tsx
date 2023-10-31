import React, { createContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

export interface User {
  fullName: string;
  contactId?: number;
  email?: string;
  token?: string;
  role?: string;
  isAuthorized?: boolean;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    fullName: '',
    email: localStorage.getItem('userEmail') || '',
    role: localStorage.getItem('role') || '',
    token: localStorage.getItem('accessToken') || '',
    contactId: Number(localStorage.getItem('contactId')) || 0, // Get contactId from localStorage
});

  const [loading, setLoading] = useState(true);

  const setUserWithLocalStorage: Dispatch<SetStateAction<User | null>> = (updatedUser: any) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem('accessToken', updatedUser.token || '');
      localStorage.setItem('userEmail', updatedUser.email || '');
      localStorage.setItem('role', updatedUser.role || '');
      localStorage.setItem('userFullName', updatedUser.fullName || '');
      localStorage.setItem('contactId', updatedUser.contactId?.toString() || ''); // Save contactId to localStorage
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('contactId'); // Remove contactId from localStorage
    }
};


  const fetchUserFullName = async () => {
    if (user?.email) {
      try {
        const response = await fetch(`https://localhost:7286/api/Account/user?email=${user.email}`);
        if (response.ok) {
          const userData = await response.json();
          const fullName = userData.fullName || '';
          setUser((prevUser: any) => ({ ...(prevUser || {}), fullName }));
        } else {
          // Handle the case where the user's full name cannot be fetched
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://localhost:7286/api/Account/user?email=${user?.email}`);
      if (response.ok) {
        const userData = await response.json();
        console.log('userData:', userData); 
        const { fullName, role, contactId } = userData; // Extract contactId from the response
        setUser((prevUser) => ({ ...prevUser, fullName, role, contactId })); // Set it in the user state
      } else {
        // Handle the case where user data cannot be fetched
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
    setLoading(false);
};

  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  useEffect(() => {
    fetchUserFullName();
  }, [user?.email, user?.role]);

  const userContextValue: UserContextType = {
    user,
    loading,
    setUser: setUserWithLocalStorage,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
}

export default UserContext;
