import { WorkoutContext } from '../context/WorkoutContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if(!context){
        return Error('useWorkoutsContext must be used inside an WokoutsContextProvider')
    }

    return context
}