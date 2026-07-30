import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ArtisanEdit(){
  const auth = useAuth()
  const nav = useNavigate()
  const [profession,setProfession] = useState('')
  const [location,setLocation] = useState('')
  const [experience,setExperience] = useState('')
  const [bio,setBio] = useState('')
  const [phone,setPhone] = useState('')
  const [skills,setSkills] = useState('')
  const [price,setPrice] = useState('')
  const [available,setAvailable] = useState(true)

  async function onSubmit(e){
    e.preventDefault()
    if (!auth.token) return alert('Please login as an artisan')
    const body = { profession, location, experience: Number(experience || 0), bio, phone, skills, price: price ? Number(price) : null, available }
    const res = await auth.fetchWithAuth('/api/artisans', { method: 'POST', body: JSON.stringify(body) })
    const data = await res.json()
    if (res.ok) {
      alert('Profile saved')
      nav('/dashboard')
    } else {
      alert(data.error || 'Failed')
    }
  }

  return (
    <div style={{maxWidth:600}}>
      <h2>Create / Edit Artisan Profile</h2>
      <form onSubmit={onSubmit}>
        <div><label>Profession</label><br/><input value={profession} onChange={e=>setProfession(e.target.value)} required /></div>
        <div><label>Location (City/State)</label><br/><input value={location} onChange={e=>setLocation(e.target.value)} required /></div>
        <div><label>Experience (years)</label><br/><input type="number" value={experience} onChange={e=>setExperience(e.target.value)} /></div>
        <div><label>Phone</label><br/><input value={phone} onChange={e=>setPhone(e.target.value)} /></div>
        <div><label>Skills (comma separated)</label><br/><input value={skills} onChange={e=>setSkills(e.target.value)} /></div>
        <div><label>Price (optional)</label><br/><input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} /></div>
        <div><label>Bio</label><br/><textarea value={bio} onChange={e=>setBio(e.target.value)} /></div>
        <div><label>Available</label> <input type="checkbox" checked={available} onChange={e=>setAvailable(e.target.checked)} /></div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  )
}
