import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockRequests } from '../data/modules'
import StatusBadge from '../components/StatusBadge'
import * as Icons from 'lucide-react'
import {
  Search,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  SlidersHorizontal,
  Stethoscope, // Fallback icon
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Database row interface matching your JSON response
export interface HealthService {
  id: string
  title: string
  description: string
  status: string
  enrollment_count: number
  min_age: number | null
  max_age: number | null
  eligible_gender: string | null
  icon_key: string | null
  created_at: string
  updated_at: string
}

// Helper component to dynamically render Lucide Icons by name string (e.g., "UserCheck")
function DynamicIcon({ name, className }: { name: string | null; className?: string }) {
  if (!name || !(name in Icons)) {
    return <Stethoscope className={className} />
  }
  const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  return <IconComponent className={className} />
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // State Management
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [services, setServices] = useState<HealthService[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const userName = user?.name || 'Valued Citizen'
  const recentApplications = mockRequests.slice(0, 3)

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'permits', label: 'Sanitary Permits' },
    { id: 'inspections', label: 'Inspections' },
    { id: 'health', label: 'Medical & Vaccines' },
  ]

  // Asynchronous Backend Fetching
  useEffect(() => {
    let isMounted = true

    const fetchServices = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          searchQuery,
          selectedCategory,
        })

        const response = await fetch(`http://localhost:5000/api/services?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to load services from server.')
        }

        const data: HealthService[] = await response.json()

        if (isMounted) {
          setServices(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Debounce API calls by 300ms on typing
    const debounceTimer = setTimeout(fetchServices, 300)

    return () => {
      isMounted = false
      clearTimeout(debounceTimer)
    }
  }, [searchQuery, selectedCategory])

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Welcome Back
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hello, {userName}
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            Access city health resources, track active requests, and schedule appointments online.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health services..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Available Health Services</h2>

        {loading ? (
          /* Loading Skeleton Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6 h-48 animate-pulse space-y-4"
              >
                <div className="w-10 h-10 bg-slate-200 rounded-2xl" />
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 rounded-md w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-6 bg-red-50 text-red-600 rounded-2xl text-xs font-semibold text-center border border-red-100">
            {error}
          </div>
        ) : services.length === 0 ? (
          /* Empty Search Results */
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 space-y-2">
            <p className="text-sm font-bold text-slate-700">No services found</p>
            <p className="text-xs text-slate-500">Try adjusting your search criteria or category filter.</p>
          </div>
        ) : (
          /* Services Mapping */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-slate-100 hover:border-blue-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <DynamicIcon name={service.icon_key} className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        service.status.toLowerCase() === 'active'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {service.enrollment_count} Active Enrollees
                  </span>
                  <button
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Applications Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
            <p className="text-xs text-slate-500">Track current service request statuses</p>
          </div>
          <button
            onClick={() => navigate('/applications')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentApplications.map((req) => (
            <div key={req.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{req.title || req.serviceName}</p>
                  <p className="text-[11px] text-slate-400">Ref: {req.id}</p>
                </div>
              </div>
              <StatusBadge status={req.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}