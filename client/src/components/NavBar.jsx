import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar(){
  const auth = useAuth()
  const nav = useNavigate()
  function onLogout(){
    auth.logout()
    nav('/')
  }
  return (
    <header style={{padding:12,borderBottom:'1px solid #ddd',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>
        <Link to="/">Home</Link> | <Link to="/search">Search</Link>
      </div>
      <div>
        {auth.user ? (
          <>
            <span style={{marginRight:8}}>Hi, {auth.user.name}</span>
            <Link to="/dashboard" style={{marginRight:8}}>Dashboard</Link>
            {auth.user.role === 'ARTISAN' && <Link to="/artisan/edit" style={{marginRight:8}}>Edit Profile</Link>}
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:8}}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
