import React from 'react'
import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {signup,error,isLoading} = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email,password)
    }

  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label name='email'>Email:</label>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} name='email' />
        <label name='password'>Password:</label>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} name='password' />
        <button type='submit' disabled={isLoading}>Sign up</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup
