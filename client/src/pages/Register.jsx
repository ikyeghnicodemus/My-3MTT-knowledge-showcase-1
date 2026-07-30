import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('CUSTOMER')
  const nav = useNavigate()
  const auth = useAuth()

  async function onSubmit(e){
    e.preventDefault()
    const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password, role }) })
    const data = await res.json()
    if (res.ok) {
      auth.login(data.user, data.token)
      nav('/')
    } else {
      alert(data.error || 'Registration failed')
    }
  }
  return (
    <div style={{maxWidth:480}}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div><label>Name</label><br/><input value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><label>Email</label><br/><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Password</label><br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div>
          <label>Role</label><br/>
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="CUSTOMER">Customer</option>
            <option value="ARTISAN">Artisan</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
