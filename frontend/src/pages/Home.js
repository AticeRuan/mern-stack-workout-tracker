import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutsForm from '../components/WorkoutsForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  const api_url=process.env.REACT_APP_API_BASE_URL

  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${api_url}/api/workouts`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      console.log(response);
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
    
  }, [dispatch, user,api_url])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutsForm />
    </div>
  )
}

export default Home