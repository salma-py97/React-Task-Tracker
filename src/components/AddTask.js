// each input is gonna have it's own state, component level not app level so useState

import {useState} from 'react';


const AddTask = ({onAdd}) => {

    const [text, setText] = useState("")
    const [day, setDay] = useState("")
    const [reminder, setReminder] = useState(false)

    // When we submit we won't call onAdd directly
     const onSubmit = (e) => {
        e.preventDefault()
        // console.log('submitted')
        if (!text){
            alert("Please Add Task")
            return
        } else {
            onAdd({text, day, reminder})
        }

        // Clear Form
        setText('')
        setDay('')
        setReminder(false)
     }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add a Task..." value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add a Day & Time..." value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" value={reminder} 
                checked = {reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type="submit" value="Save Task" className='btn btn-block' />
        </form>
    )
}

export default AddTask
