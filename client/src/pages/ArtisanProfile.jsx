import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function ArtisanProfile(){
  const { id } = useParams()
  const [artisan,setArtisan] = useState(null)
  useEffect(()=>{ fetchArtisan() },[])
  async function fetchArtisan(){
    const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/artisans/${id}`)
    const data = await res.json()
    if (res.ok) setArtisan(data)
  }
  if (!artisan) return <div>Loading...</div>
  return (
    <div>
      <h2>{artisan.user?.name}</h2>
      <p><strong>Profession:</strong> {artisan.profession}</p>
      <p><strong>Location:</strong> {artisan.location}</p>
      <p><strong>Experience:</strong> {artisan.experience} years</p>
      <p>{artisan.bio}</p>
      <p><a href={`tel:${artisan.phone}`}>Call: {artisan.phone}</a></p>
      <p><a href={`mailto:${artisan.user?.email}`}>Email: {artisan.user?.email}</a></p>
    </div>
  )
}
