import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError('')
            setEmptyFields([])
            dispatch({ type: 'CREATE_WORKOUTS', payload: json})
        }
    }

    return (
        <>
        <form className="workout-form" onSubmit={handleSubmit}>
            <h3>
                Add new Workout
            </h3>

            <label htmlFor="">Exercise Title: </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''} />

            <label htmlFor="">Load (in Kg): </label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} className={emptyFields.includes('load') ? 'error' : ''} />

            <label htmlFor="">Reps: </label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''} />

            <button className='submit'>Add Workout</button>
            {error && <div className='error'>{error} </div> }

        </form>
        </>
    )
}

export default WorkoutForm