import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const priorityColors = {
  low: 'bg-green-500/10 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  high: 'bg-red-500/10 text-red-400 border-red-500/30',
}

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('low')
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://task-manager-backend-production-8e1a.up.railway.app/api/tasks',
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
      await axios.post('https://task-manager-backend-production-8e1a.up.railway.app/api/tasks',
        { title, description, priority, dueDate },
        { withCredentials: true }
      )
      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('low')
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-manager-backend-production-8e1a.up.railway.app/api/tasks/${id}`,
        { withCredentials: true }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleComplete = async (id, completed) => {
    try {
      await axios.patch(`https://task-manager-backend-production-8e1a.up.railway.app/api/tasks/${id}`,
        { completed: !completed },
        { withCredentials: true }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    await axios.post('https://task-manager-backend-production-8e1a.up.railway.app/logout',
      {},
      { withCredentials: true }
    )
    navigate('/login')
  }

  const pending = tasks.filter(t => !t.completed)
  const completed = tasks.filter(t => t.completed)

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <div className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Create Task Form */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Task</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
            <div className="flex gap-3">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Pending Tasks */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Pending — {pending.length}
          </h2>
          {pending.length === 0 && (
            <p className="text-gray-600 text-sm">No pending tasks. Add one above.</p>
          )}
          <div className="space-y-3">
            {pending.map(task => (
              <div key={task._id} className="bg-gray-900 rounded-xl p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-gray-400 text-sm">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <p className="text-gray-600 text-xs mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleComplete(task._id, task.completed)}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-xs bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Completed — {completed.length}
            </h2>
            <div className="space-y-3">
              {completed.map(task => (
                <div key={task._id} className="bg-gray-900/50 rounded-xl p-4 flex items-start justify-between gap-4 opacity-60">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-400 line-through">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-500 text-sm">{task.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleComplete(task._id, task.completed)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1.5 rounded-lg transition"
                    >
                      Undo
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-xs bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks