import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()
  async function onSubmit(e){
    e.preventDefault()
    const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      nav('/')
    } else {
      alert(data.error || 'Login failed')
    }
  }
  return (
    <div style={{maxWidth:420}}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div><label>Email</label><br/><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Password</label><br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
