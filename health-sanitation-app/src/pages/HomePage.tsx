import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleAccessDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/signin')
    }
  }

  return (
    <div className="flex flex-col">
      <section className="relative bg-bg-page overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16 lg:py-0">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-6">
                Building a Healthier Community Together
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                A comprehensive digital platform for managing health services, sanitation programs, and community wellness. Access permits, track immunizations, and monitor public health — all in one secure system.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAccessDashboard}
                  className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary-600/20"
                >
                  Access Dashboard
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="bg-white text-primary-600 border-2 border-primary-200 px-8 py-4 rounded-xl font-semibold hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
                  alt="Modern healthcare facility"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-page/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
            &ldquo;Healthy people, clean environment, strong community.&rdquo;
          </blockquote>
          <p className="text-primary-100 text-xl font-medium">Together for a Healthier Tomorrow</p>
        </div>
      </section>
    </div>
  )
}
