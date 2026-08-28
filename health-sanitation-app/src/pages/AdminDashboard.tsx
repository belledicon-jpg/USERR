import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Admin dashboard content has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="text-primary-600 font-semibold hover:text-primary-700"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
