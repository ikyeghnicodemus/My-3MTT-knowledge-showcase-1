import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const auth = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    load()
  },[])

  async function load(){
    if (!auth.token) return
    setLoading(true)
    const res = await auth.fetchWithAuth('/api/bookings')
    const data = await res.json()
    if (res.ok) setBookings(data)
    setLoading(false)
  }

  async function updateStatus(bookingId, status){
    if (!auth.token) return
    const res = await auth.fetchWithAuth(`/api/bookings/${bookingId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
    const data = await res.json()
    if (res.ok) {
      load()
    } else {
      alert(data.error || 'Failed to update status')
    }
  }

  return (
    <div>
      <h2>Bookings</h2>
      {!auth.user && <p>Please login to see bookings.</p>}
      {loading && <p>Loading...</p>}
      {!loading && bookings.length===0 && <p>No bookings found.</p>}
      {bookings.map(b => (
        <div key={b.id} style={{border:'1px solid #eee',padding:8,marginBottom:8}}>
          <p><strong>Status:</strong> {b.status}</p>
          {b.customer && <p><strong>Customer:</strong> {b.customer.name} ({b.customer.email})</p>}
          {b.artisan && <p><strong>Artisan:</strong> {b.artisan.user?.name}</p>}
          <p><strong>Date:</strong> {new Date(b.date).toLocaleString()}</p>
          <p>{b.description}</p>

          {/* If user is artisan and booking is pending show accept/reject */}
          {auth.user && auth.user.role === 'ARTISAN' && b.status === 'PENDING' && (
            <div style={{marginTop:8}}>
              <button onClick={()=>updateStatus(b.id, 'ACCEPTED')}>Accept</button>
              <button onClick={()=>updateStatus(b.id, 'REJECTED')} style={{marginLeft:8}}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
