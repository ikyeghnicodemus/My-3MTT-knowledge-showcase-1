import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import ArtisanProfile from './pages/ArtisanProfile'
import ArtisanEdit from './pages/ArtisanEdit'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/AuthContext'

export default function App(){
  return (
    <AuthProvider>
      <div className="app">
        <NavBar />
        <main style={{padding:16}}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/artisan/:id" element={<ArtisanProfile/>} />
            <Route path="/artisan/edit" element={<ArtisanEdit/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
