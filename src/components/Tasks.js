import PropTypes from 'prop-types'

import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        <>
            {tasks.map((task) => (
                // Warning: Each child in a list should have a unique "key" prop.
                // <h3 key={task.id}>{task.text}</h3>
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

Tasks.protoType = {
    tasks: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}
export default Tasks
