import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import ArtisanProfile from './pages/ArtisanProfile'

export default function App(){
  return (
    <div className="app">
      <header style={{padding:16,borderBottom:'1px solid #ddd'}}>
        <Link to="/">Home</Link> | <Link to="/search">Search</Link> | <Link to="/login">Login</Link>
      </header>
      <main style={{padding:16}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/artisan/:id" element={<ArtisanProfile/>} />
        </Routes>
      </main>
    </div>
  )
}
