import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const auth = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(()=>{
    load()
  },[])

  async function load(){
    if (!auth.token) return
    const res = await auth.fetchWithAuth('/api/bookings')
    const data = await res.json()
    if (res.ok) setBookings(data)
  }

  return (
    <div>
      <h2>Bookings</h2>
      {!auth.user && <p>Please login to see bookings.</p>}
      {bookings.length===0 && <p>No bookings found.</p>}
      {bookings.map(b => (
        <div key={b.id} style={{border:'1px solid #eee',padding:8,marginBottom:8}}>
          <p><strong>Status:</strong> {b.status}</p>
          {b.customer && <p><strong>Customer:</strong> {b.customer.name} ({b.customer.email})</p>}
          {b.artisan && <p><strong>Artisan:</strong> {b.artisan.user?.name}</p>}
          <p><strong>Date:</strong> {new Date(b.date).toLocaleString()}</p>
          <p>{b.description}</p>
        </div>
      ))}
    </div>
  )
}
