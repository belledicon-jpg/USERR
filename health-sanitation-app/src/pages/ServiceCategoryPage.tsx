import { useParams, useNavigate, Link } from 'react-router-dom'
import { getServiceCategory } from '../data/services'
import { useApplications } from '../context/ApplicationContext'
import { FileText, ChevronRight, ClipboardList } from 'lucide-react'

export default function ServiceCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { applications } = useApplications()
  
  const category = getServiceCategory(categoryId || '')
  
  if (!category) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Module Not Found</h1>
          <p className="text-gray-600 mb-8">The service module you are looking for does not exist.</p>
          <button onClick={() => navigate('/')} className="text-primary-600 font-semibold hover:text-primary-700">
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const categoryApplications = applications.filter(app => app.categoryId === category.id)

  const themeMap: Record<string, { bg: string; text: string; border: string; btn: string; btnHover: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700' },
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', btn: 'bg-orange-600', btnHover: 'hover:bg-orange-700' },
    navy: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', btn: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700' },
    purple: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', btn: 'bg-violet-600', btnHover: 'hover:bg-violet-700' }
  }
  
  const theme = themeMap[category.colorTheme] || themeMap.blue

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors font-medium">Home</button>
            <span className="text-gray-300">/</span>
            <span className="text-primary-900 font-medium">{category.title}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 ${theme.bg} rounded-2xl flex items-center justify-center text-4xl flex-shrink-0`}>
              {category.icon}
            </div>
            <div>
               <h1 className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight">{category.title} | GovServe Services</h1>
              <p className="text-gray-600 mt-3 text-lg leading-relaxed max-w-3xl">{category.longDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary-900 px-8 py-6">
                 <h2 className="text-xl font-bold text-white tracking-tight">Available QC Services</h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.subServices.map((subService: any) => (
                    <div key={subService.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 ${theme.bg} rounded-lg flex items-center justify-center ${theme.text} flex-shrink-0`}>
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-900">{subService.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{subService.description}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{subService.fee}</span>
                        <Link
                          to={`/apply/${category.id}/${subService.id}`}
                          className={`inline-flex items-center gap-1 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${theme.btn} ${theme.btnHover}`}
                        >
                          Apply <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary-900 px-6 py-4">
                 <h3 className="font-bold text-white text-sm uppercase tracking-wider">Quick QC Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                {category.actionableButtons.map((btn: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (btn.action === 'apply') {
                        navigate(`/apply/${category.id}/${category.subServices[0].id}`)
                      } else if (btn.action === 'tracking') {
                        navigate(`/application?category=${category.id}`)
                      } else if (btn.action === 'records') {
                        navigate(`/application?category=${category.id}`)
                      } else {
                        navigate(`/apply/${category.id}/${category.subServices[0].id}`)
                      }
                    }}
                    className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                      btn.type === 'primary'
                        ? `${theme.btn} ${theme.btnHover} text-white shadow-sm`
                        : btn.type === 'secondary'
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary-900 px-6 py-4">
                 <h3 className="font-bold text-white text-sm uppercase tracking-wider">My QC Requests</h3>
              </div>
              <div className="p-6">
                {categoryApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">No applications yet for this module.</p>
                    <Link to={`/apply/${category.id}/${category.subServices[0].id}`} className={`inline-flex items-center gap-1 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${theme.btn} ${theme.btnHover}`}>
                      Apply Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categoryApplications.slice(0, 5).map((app) => (
                      <Link
                        key={app.id}
                        to={`/application/${app.id}`}
                        className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-primary-900">{app.subServiceName}</h4>
                          <span className="text-xs font-medium text-gray-500">{app.applicationNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{new Date(app.submittedAt).toLocaleDateString()}</span>
                          <span className="text-xs font-medium text-primary-600 flex items-center gap-1">
                            View Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">i</span>
                </div>
                <p className="text-sm text-primary-800 leading-relaxed">
                  <strong>Processing Time:</strong> {category.processingTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
