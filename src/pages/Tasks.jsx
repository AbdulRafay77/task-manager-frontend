import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('low')
  const navigate = useNavigate()

  // fetch tasks on page load
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://task-manager-backend-production-8e1a.up.railway.app/api/tasks',
        { withCredentials: true }
      )
      setTasks(res.data)
    } catch (err) {
      navigate('/login')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://task-manager-backend-production-8e1a.up.railway.app/api/tasks',
        { title, description, priority, dueDate },
        { withCredentials: true }
      )
      setTitle('')
      setDescription('')
      setPriority('low')
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://task-manager-backend-production-8e1a.up.railway.app/api/tasks/${id}`,
        { withCredentials: true }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://task-manager-backend-production-8e1a.up.railway.app/api/tasks/${id}`,
        { completed: !completed },
        { withCredentials: true }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    await axios.post('http://task-manager-backend-production-8e1a.up.railway.app/logout',
      {},
      { withCredentials: true }
    )
    navigate('/login')
  }

  return (
    <div>
      <h2>My Tasks</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 && <p>No tasks yet. Create one above.</p>}

      {tasks.map(task => (
        <div key={task._id} style={{ opacity: task.completed ? 0.5 : 1 }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => handleComplete(task._id, task.completed)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Tasks