import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutsForm = () => {
    const {dispatch} = useWorkoutsContext()
   const [title, setTitle] = useState('')
   const [load, setLoad] = useState('')
   const [reps, setReps] = useState('')
   const [error, setError] = useState('')
   const[emptyFields,setEmptyFields]=useState([])
   const {user} = useAuthContext()
   const api_url=process.env.REACT_APP_API_BASE_URL

    const  handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in to add a workout')
            return
        }
        const workout = {title, load, reps}

        const response = await fetch(`${api_url}/api/workouts`, {
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.err)

            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {


            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            console.log("Workout added")
            dispatch({type:'CREATE_WORKOUT', payload:json})
        }
        
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label name='title'>Excersize Title:</label>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} name='title' className={emptyFields.includes('title')?'error':''} />

      <label name='load'>Load (in kg):</label>
      <input type='number' value={load} onChange={(e) => setLoad(e.target.value)} name='load' className={emptyFields.includes('load')?'error':''}/>

      <label name='reps'>Reps:</label>
      <input type='number' value={reps} onChange={(e) => setReps(e.target.value)} name='reps' className={emptyFields.includes('reps')?'error':''}/>
      <button type='submit'>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutsForm
