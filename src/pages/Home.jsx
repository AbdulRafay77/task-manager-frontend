import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <div className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-400 hover:text-white transition px-4 py-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-6">
          Simple. Focused. Productive.
        </div>
        <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
          Manage your tasks<br />without the noise
        </h2>
        <p className="text-gray-400 text-lg max-w-md mb-8">
          A clean, fast task manager that helps you stay on top of what matters. No clutter, no distractions.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Get Started — It's Free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-gray-800 px-6 py-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-5">
            <div className="text-2xl mb-3">✅</div>
            <h3 className="font-semibold text-white mb-1">Track Progress</h3>
            <p className="text-gray-400 text-sm">Mark tasks complete and watch your progress grow.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-white mb-1">Set Priorities</h3>
            <p className="text-gray-400 text-sm">Label tasks as low, medium, or high priority.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="font-semibold text-white mb-1">Due Dates</h3>
            <p className="text-gray-400 text-sm">Set due dates so nothing slips through the cracks.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-4 text-center text-gray-600 text-sm">
        Built with React, Node.js, and MongoDB
      </div>

    </div>
  )
}

export default Home