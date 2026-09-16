import { useNavigate } from 'react-router-dom'
import type { ServiceModule } from '../types'
import { useAuth } from '../context/AuthContext'

interface ServiceCardProps {
  module: ServiceModule
}

export default function ServiceCard({ module }: ServiceCardProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleEnterModule = () => {
    if (isAuthenticated) {
      navigate(`/services/${module.id}`)
    } else {
      navigate('/signin')
    }
  }

  const themeMap: Record<string, { border: string; bg: string; iconBg: string; iconText: string; btn: string; btnHover: string }> = {
    blue: { border: 'border-l-blue-500', bg: 'hover:border-blue-200', iconBg: 'bg-blue-50', iconText: 'text-blue-600', btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700' },
    green: { border: 'border-l-emerald-500', bg: 'hover:border-emerald-200', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700' },
    orange: { border: 'border-l-orange-500', bg: 'hover:border-orange-200', iconBg: 'bg-orange-50', iconText: 'text-orange-600', btn: 'bg-orange-600', btnHover: 'hover:bg-orange-700' },
    navy: { border: 'border-l-indigo-500', bg: 'hover:border-indigo-200', iconBg: 'bg-indigo-50', iconText: 'text-indigo-600', btn: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700' },
    purple: { border: 'border-l-violet-500', bg: 'hover:border-violet-200', iconBg: 'bg-violet-50', iconText: 'text-violet-600', btn: 'bg-violet-600', btnHover: 'hover:bg-violet-700' }
  }

  const theme = themeMap[module.colorTheme] || themeMap.blue

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 ${theme.border} border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group`}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center text-2xl ${theme.iconText} flex-shrink-0`}>
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
        <button
          onClick={handleEnterModule}
          className={`flex-1 text-center text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all ${theme.btn} ${theme.btnHover} shadow-sm`}
        >
          Enter Module
        </button>
        <button
          onClick={handleEnterModule}
          className="px-5 py-3 rounded-xl text-sm font-semibold text-primary-700 border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
        >
          Details
        </button>
      </div>
    </div>
  )
}
