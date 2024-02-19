import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/'+ workout._id, {
            method: 'DELETE'
        })

        if (response.ok) {
            const json = await response.json()
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <>
            <div className="workout-details">
                <h4>
                    {workout.title}
                </h4>
                <p>
                    <strong>Load (kg): </strong> {workout.load}
                </p>
                <p>
                    <strong>Reps: </strong> {workout.reps}
                </p>
                <p>
                    {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}
                </p>
                <span onClick={ handleClick } className="material-symbols-outlined">
                    Delete
                </span>
            </div>
        </>
    )
}

export default WorkoutDetails