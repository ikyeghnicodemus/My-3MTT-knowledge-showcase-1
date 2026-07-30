import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ArtisanProfile(){
  const { id } = useParams()
  const [artisan,setArtisan] = useState(null)
  const [loading,setLoading] = useState(true)
  const auth = useAuth()

  // booking form state
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{ fetchArtisan() },[])
  async function fetchArtisan(){
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/artisans/${id}`)
    const data = await res.json()
    if (res.ok) setArtisan(data)
    setLoading(false)
  }

  async function submitBooking(e){
    e.preventDefault()
    if (!auth.token) return alert('Please login to make a booking')
    if (!date || !time) return alert('Please provide date and time')
    // combine date and time into ISO string
    const iso = new Date(`${date}T${time}`).toISOString()
    const body = { artisanId: Number(id), date: iso, time, description }
    const res = await auth.fetchWithAuth('/api/bookings', { method: 'POST', body: JSON.stringify(body) })
    const data = await res.json()
    if (res.ok) {
      alert('Booking submitted')
      setShowForm(false)
      setDate('')
      setTime('')
      setDescription('')
    } else {
      alert(data.error || 'Failed to submit booking')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!artisan) return <div>Artisan not found</div>
  return (
    <div>
      <h2>{artisan.user?.name}</h2>
      <p><strong>Profession:</strong> {artisan.profession}</p>
      <p><strong>Location:</strong> {artisan.location}</p>
      <p><strong>Experience:</strong> {artisan.experience} years</p>
      <p>{artisan.bio}</p>
      <p><a href={`tel:${artisan.phone}`}>Call: {artisan.phone}</a></p>
      <p><a href={`mailto:${artisan.user?.email}`}>Email: {artisan.user?.email}</a></p>

      {/* Booking UI for customers */}
      {auth.user && auth.user.role === 'CUSTOMER' && (
        <div style={{marginTop:20}}>
          {!showForm ? (
            <button onClick={()=>setShowForm(true)}>Book Now</button>
          ) : (
            <form onSubmit={submitBooking} style={{maxWidth:480,marginTop:12}}>
              <div>
                <label>Date</label><br/>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
              </div>
              <div>
                <label>Time</label><br/>
                <input type="time" value={time} onChange={e=>setTime(e.target.value)} required />
              </div>
              <div>
                <label>Description</label><br/>
                <textarea value={description} onChange={e=>setDescription(e.target.value)} />
              </div>
              <div style={{marginTop:8}}>
                <button type="submit">Submit Booking</button>
                <button type="button" style={{marginLeft:8}} onClick={()=>setShowForm(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* If user is artisan, show a link to dashboard */}
      {auth.user && auth.user.role === 'ARTISAN' && (
        <div style={{marginTop:20}}>
          <p>You can view bookings in your <a href="/dashboard">dashboard</a>.</p>
        </div>
      )}
    </div>
  )
}
