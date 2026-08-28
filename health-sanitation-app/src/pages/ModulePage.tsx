import { useNavigate, useParams } from 'react-router-dom'
import { serviceModules, getServiceCategory } from '../data/services'
import type { ApplicationFormField } from '../types'

export default function ModulePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const module = serviceModules.find(m => m.id === id)

  if (!module) {
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

  const category = getServiceCategory(module.id)
  const firstSubService = category?.subServices[0]

  const formFields: ApplicationFormField[] = [
    { name: 'fullName', label: 'Full Name / Business Name', type: 'text', required: true, placeholder: 'Juan Dela Cruz' },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: false },
    { name: 'address', label: 'Home / Business Address', type: 'text', required: true, placeholder: '123 Quezon Ave, QC' },
    { name: 'contact', label: 'Contact Number', type: 'tel', required: true, placeholder: '09123456789' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'juan@example.com' },
    { name: 'idNumber', label: 'Government ID Number', type: 'text', required: true, placeholder: 'SSS / PhilHealth / TIN' },
    { name: 'location', label: 'Location / GPS Coordinates', type: 'location', required: false },
    { name: 'documents', label: 'Upload Documents', type: 'file', required: true }
  ]

  const buttonColorMap: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-emerald-600 hover:bg-emerald-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    navy: 'bg-indigo-600 hover:bg-indigo-700',
    purple: 'bg-violet-600 hover:bg-violet-700'
  }

  const handleGoToApply = () => {
    if (firstSubService) {
      navigate(`/apply/${module.id}/${firstSubService.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors font-medium">Home</button>
            <span className="text-gray-300">/</span>
            <span className="text-primary-900 font-medium">{module.title}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
              {module.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight">{module.title}</h1>
              <p className="text-gray-600 mt-3 text-lg leading-relaxed max-w-3xl">{module.longDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="bg-primary-900 px-8 py-6">
                   <h2 className="text-xl font-bold text-white tracking-tight">GovServe Service Information</h2>
                </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-primary-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">Eligibility</h3>
                    <ul className="space-y-3">
                      {module.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-primary-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">Requirements</h3>
                    <ul className="space-y-3">
                      {module.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-primary-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">Fees</h3>
                    <div className="space-y-3">
                      {module.fees.map((fee, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{fee.service}</span>
                          <span className="font-bold text-primary-900">{fee.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-primary-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">Processing Time</h3>
                    <p className="text-sm text-gray-700 font-medium">{module.processingTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary-900 px-8 py-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Application Form</h2>
              </div>
              <div className="p-8">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleGoToApply(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-semibold text-primary-900 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.type === 'file' ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer bg-gray-50">
                            <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                          </div>
                        ) : field.type === 'location' ? (
                          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                            <p className="text-sm text-gray-600 font-medium">📍 Click map to pin location</p>
                            <div className="h-40 bg-gray-200 rounded-lg mt-3 flex items-center justify-center text-gray-400 text-sm font-medium">
                              Map Placeholder
                            </div>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      className={`${buttonColorMap[module.colorTheme]} text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-sm`}
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/services/${module.id}`)}
                      className="px-8 py-3.5 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      View Services
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary-900 px-6 py-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                {module.actionableButtons.map((btn) => (
                  <button
                    key={btn.action}
                    onClick={() => {
                      if (btn.action === 'apply' && firstSubService) {
                        navigate(`/apply/${module.id}/${firstSubService.id}`)
                      } else if (btn.action === 'tracking') {
                        navigate(`/application?category=${module.id}`)
                      } else if (btn.action === 'records') {
                        navigate(`/application?category=${module.id}`)
                      } else if (firstSubService) {
                        navigate(`/apply/${module.id}/${firstSubService.id}`)
                      }
                    }}
                    className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                      btn.type === 'primary'
                        ? `${buttonColorMap[module.colorTheme]} text-white shadow-sm`
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
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Dashboard Features</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {module.dashboardFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">i</span>
                </div>
                <p className="text-sm text-primary-800 leading-relaxed">
                  <strong>Privacy Notice:</strong> Your data is encrypted and handled in accordance with the GovServe Services Privacy Policy. Location and document data are stored securely with automatic 7-year retention per government regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
