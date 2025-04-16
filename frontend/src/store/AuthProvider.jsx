import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { createContext } from 'react';

export const authContext = createContext({
  user: null,
  handleLogin: (token) => { },
  handleLogout: () => { }
});

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)

  const handleLogin = (token) => {
    const decodedUser= jwtDecode(token)
    localStorage.setItem("userId", decodedUser.sub)
    localStorage.setItem("role", decodedUser.roles)
    localStorage.setItem("token", token)
    setUser(decodedUser)
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <authContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </authContext.Provider>
  )
}

