import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Search(){
  const [q,setQ] = useState('')
  const [results,setResults] = useState([])
  useEffect(()=>{ if (q==='') return; const t=setTimeout(()=>search(),300); return ()=>clearTimeout(t) },[q])
  async function search(){
    const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/artisans?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    if (res.ok) setResults(data)
    else setResults([])
  }
  return (
    <div>
      <h2>Search Artisans</h2>
      <input placeholder="Search by profession, location, skills..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:8,marginBottom:12}} />
      <div>
        {results.length===0 && <p>No results yet.</p>}
        {results.map(a=> (
          <div key={a.id} style={{border:'1px solid #eee',padding:12,marginBottom:8}}>
            <h3>{a.user?.name} — {a.profession}</h3>
            <p>{a.location} • {a.experience} yrs</p>
            <Link to={`/artisan/${a.id}`}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
