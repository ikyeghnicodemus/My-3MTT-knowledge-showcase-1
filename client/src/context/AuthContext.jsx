import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(()=>{
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t) setToken(t)
    if (u) setUser(JSON.parse(u))
  },[])

  function login(userObj, jwt){
    setUser(userObj)
    setToken(jwt)
    localStorage.setItem('token', jwt)
    localStorage.setItem('user', JSON.stringify(userObj))
  }

  function logout(){
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function fetchWithAuth(path, opts = {}){
    const headers = opts.headers || {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
    const res = await fetch((import.meta.env.VITE_API_BASE || 'http://localhost:4000') + path, { ...opts, headers })
    return res
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
