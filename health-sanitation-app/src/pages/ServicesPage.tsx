import { useNavigate } from 'react-router-dom'
import { serviceCategories } from '../data/services'
import { CheckCircle2 } from 'lucide-react'

const serviceDetails: Record<string, { intro: string; capabilities: string[] }> = {
  'health-center': {
    intro: 'Access essential health center services through a centralized digital platform.',
    capabilities: [
      'Request medical consultation',
      'Book appointments',
      'View available doctors',
      'Request health certificates',
      'Manage health records'
    ]
  },
  'sanitation-permit': {
    intro: 'Manage sanitation permits and inspection requests digitally.',
    capabilities: [
      'Apply for sanitation permits',
      'Request inspections',
      'Track inspection status',
      'View compliance requirements',
      'Monitor violations'
    ]
  },
  'immunization-nutrition': {
    intro: 'Monitor vaccination and nutrition information.',
    capabilities: [
      'Track immunization records',
      'View vaccination schedules',
      'Receive vaccination reminders',
      'Monitor children\'s nutrition',
      'Track nutrition programs'
    ]
  },
  'wastewater-septic': {
    intro: 'Handle wastewater and septic services online.',
    capabilities: [
      'Request septic tank desludging',
      'Apply for wastewater permits',
      'Report drainage issues',
      'Schedule inspections',
      'Track service requests'
    ]
  },
  'health-surveillance': {
    intro: 'Monitor and report public health data in real time.',
    capabilities: [
      'Submit disease reports',
      'Report health incidents',
      'Upload surveillance data',
      'View surveillance dashboards',
      'Track submitted reports'
    ]
  }
}

export default function ServicesPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">Services</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 tracking-tight mb-4">Healthcare and Sanitation Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Designed to make essential community services easier to access, manage, and monitor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {serviceCategories.map((category) => {
          const details = serviceDetails[category.id]
          if (!details) return null

          const themeMap: Record<string, { btn: string; btnHover: string }> = {
            blue: { btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700' },
            green: { btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700' },
            orange: { btn: 'bg-orange-600', btnHover: 'hover:bg-orange-700' },
            navy: { btn: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700' },
            purple: { btn: 'bg-violet-600', btnHover: 'hover:bg-violet-700' }
          }
          const theme = themeMap[category.colorTheme] || themeMap.blue

          return (
            <div key={category.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight mb-4">{category.title.toUpperCase()}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{details.intro}</p>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-primary-900 uppercase tracking-widest mb-4">What you can do</h3>
                  <ul className="space-y-3">
                    {details.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-base font-medium">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate(`/services/${category.id}`)}
                  className={`${theme.btn} ${theme.btnHover} text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-sm`}
                >
                  Access Service
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-primary-900 px-8 py-6">
                  <h3 className="text-xl font-bold text-white tracking-tight">Service Overview</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">{category.longDescription}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Processing Time</p>
                      <p className="text-sm font-semibold text-primary-900">{category.processingTime}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Eligibility</p>
                      <p className="text-sm font-semibold text-primary-900">All residents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
