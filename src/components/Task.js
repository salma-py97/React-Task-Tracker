import {FaTimes} from 'react-icons/fa'
import PropTypes from 'prop-types'


const Task = ({task, onDelete, onToggle}) => {
    // destructuring task object
    const {id, text, day, reminder} = task;
    return (
        <div className={`task ${reminder ? 'reminder' : ""}`} 
        onDoubleClick={() => onToggle(id)} >

            <h3>{text} <FaTimes style={{color: "red", cursor:'pointer'}} onClick={()=> onDelete(id)} /> </h3>

            <p>{day}</p>

        </div>
    

    )
}

Task.propTypes = {
    task: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Task
