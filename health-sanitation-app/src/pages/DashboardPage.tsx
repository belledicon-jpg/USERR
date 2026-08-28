import { Link, useNavigate } from 'react-router-dom'
import { serviceModules } from '../data/services'
import { mockRequests, mockAIReminders } from '../data/modules'
import StatusBadge from '../components/StatusBadge'
import { Bell, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const userName = user?.name || 'User'

  const recentApplications = mockRequests.slice(0, 4)

  const aiReminder = mockAIReminders[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'under-review': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'approved': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      case 'inspection-scheduled': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-3">My GovServe Services</span>
              <h1 className="text-4xl font-bold text-primary-900 tracking-tight">GovServe Services Dashboard</h1>
              <p className="text-gray-600 mt-2 text-lg">Welcome back, <span className="font-semibold text-primary-900">{userName}</span>. Manage your health and sanitation services.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceModules.map((module) => {
            const themeMap: Record<string, { btn: string; btnHover: string; border: string }> = {
              blue: { btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700', border: 'hover:border-blue-200' },
              green: { btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700', border: 'hover:border-emerald-200' },
              orange: { btn: 'bg-orange-600', btnHover: 'hover:bg-orange-700', border: 'hover:border-orange-200' },
              navy: { btn: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700', border: 'hover:border-indigo-200' },
              purple: { btn: 'bg-violet-600', btnHover: 'hover:bg-violet-700', border: 'hover:border-violet-200' },
              cyan: { btn: 'bg-cyan-600', btnHover: 'hover:bg-cyan-700', border: 'hover:border-cyan-200' }
            }
            const theme = themeMap[module.colorTheme] || themeMap.blue

            return (
              <div key={module.id} className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${theme.border} transition-all duration-300 flex flex-col h-full group`}>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 ${module.bgColor} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900 text-lg leading-tight">
                        {module.title}
                      </h3>
                      <span className="inline-block mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {module.processingTime}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {module.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {module.actionableButtons.slice(0, 3).map((btn) => (
                      <span key={btn.action} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100">
                        {btn.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6 flex gap-3">
                  <Link
                    to={`/services/${module.id}`}
                    className={`flex-1 text-center text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all ${theme.btn} ${theme.btnHover} shadow-sm`}
                  >
                    Enter Module
                  </Link>
                  <Link
                    to={`/services/${module.id}`}
                    className="px-5 py-3 rounded-xl text-sm font-semibold text-primary-700 border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    View Requirements
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {aiReminder && (
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-violet-900">AI Vaccination Reminder</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-violet-700 mb-3">
                    Next vaccine: <span className="font-semibold">Pentavalent - Dose 2</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-violet-800">
                      <Calendar className="w-4 h-4" />
                      <span>September 5, 2026</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor('pending')}`}>
                      Upcoming
                    </span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigate('/services/immunization-nutrition')}
                      className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate('/services/immunization-nutrition')}
                      className="inline-flex items-center gap-2 text-violet-700 border-2 border-violet-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-50 transition-all"
                    >
                      Vaccination Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-bold text-primary-900 tracking-tight">Recent Applications</h2>
             <p className="text-sm text-gray-500 mt-1">Your latest GovServe Services applications</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Reference</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Service</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-mono text-primary-900 font-semibold">{tx.referenceNumber}</td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-700 font-medium">{tx.type}</td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-600">{new Date(tx.submittedAt).toLocaleDateString()}</td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-700 font-medium">{tx.amount}</td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm">
                      <button
                        onClick={() => navigate(`/application/${tx.id}`)}
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}