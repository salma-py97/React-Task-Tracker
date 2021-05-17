import {useState, useEffect} from 'react'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import Footer from './components/Footer'
import About from './components/About'

// import axios from 'axios'

const App = () => {
 //  {useState} hook
    // State for the tasks
    const [tasks, setTasks] = useState([])

    // State for the Add button that will toggle the form
    // The form will be dependant on this state, if true show, if false don't show
    const [showAddTask, setShowAddTask] = useState(false)

 // {useEffect} hook - get data as soon as page loads

    useEffect(() => {
        const getTasks = async () => {
            // fetTasks return a promise so use async await
            const tasksFromServer = await fetchTasks()
            // when we get the data set State to the data
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    // Fetch Singular Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }
 // Actions
    // Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })

        setTasks(tasks.filter(task => 
            task.id !== id
        ))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(tasks.map(task => 
            task.id === id ? {...task, reminder: data.reminder} : task
        ))
    }

    // Add Task - Submit Form
    const addTask = async (task) => {
        // console.log(task)
        const res = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(task)
        })

        const data = await res.json();


        // Add the new Task to State
        setTasks([...tasks, data])
    }

    return (
        <Router>
            <div className="container">
                {/* The button that will toggle the form is inside Header */}
                <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                

                <Route exact path='/' render={(props) => (
                    <>
                        {/* if showAddTask is true show Form */}
                        {/* The form will be dependant on this state, if true show, if false don't show */}
                        {/* See State at the top */}
                        {showAddTask && 
                            <AddTask onAdd={addTask} />
                        }
        
                        {tasks.length > 0 ?
                        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                        :
                        <h3 style={{marginTop: "50px", color:'red'}}>No Tasks to show</h3>
                        }
                    
                    </>
                )} />

                <Route exact path='/about' component={About} />

    
                <Footer />
            </div>
        </Router>
    )
}

export default App
