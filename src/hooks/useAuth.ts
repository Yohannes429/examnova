import { useState, useEffect } from 'react';

interface User {
  name: string;
  username: string;
  email: string;
  role: 'teacher' | 'student';
  teacherUsername?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (currentUser && loggedIn) {
      setUser(JSON.parse(currentUser));
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return { user, isLoggedIn, logout };
};