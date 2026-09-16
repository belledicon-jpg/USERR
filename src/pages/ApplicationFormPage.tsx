import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubService } from '../data/services'
import { useApplications } from '../context/ApplicationContext'
import { useAuth } from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'
import { Upload, FileText, ChevronRight } from 'lucide-react'

export default function ApplicationFormPage() {
  const { categoryId, subServiceId } = useParams<{ categoryId: string; subServiceId: string }>()
  const navigate = useNavigate()
  const { addApplication } = useApplications()
  const { user } = useAuth()
  
  const result = getSubService(categoryId || '', subServiceId || '')
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    contactNumber: '',
    address: '',
    barangay: '',
    dateOfBirth: '',
    idNumber: '',
    preferredDate: '',
    healthConcern: '',
    additionalDetails: '',
    documents: [] as string[]
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedApp, setSubmittedApp] = useState<ReturnType<typeof useApplications>['applications'][0] | null>(null)
  
  if (!result) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you are looking for does not exist.</p>
          <button onClick={() => navigate('/')} className="text-primary-600 font-semibold hover:text-primary-700">
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }
  
  const { category, subService } = result
  
  const themeMap: Record<string, { bg: string; text: string; border: string; btn: string; btnHover: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700' },
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', btn: 'bg-orange-600', btnHover: 'hover:bg-orange-700' },
    navy: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', btn: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700' },
    purple: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', btn: 'bg-violet-600', btnHover: 'hover:bg-violet-700' }
  }
  
  const theme = themeMap[category.colorTheme] || themeMap.blue

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const applicationNumber = `${category.title.split(' ').map((w: string) => w[0]).join('').toUpperCase()}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
    
    const newApp = {
      id: Date.now().toString(),
      applicationNumber,
      subServiceId: subService.id as string,
      subServiceName: subService.name,
      categoryId: category.id as any,
      categoryTitle: category.title,
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicantName: formData.fullName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      address: formData.address,
      barangay: formData.barangay,
      dateOfBirth: formData.dateOfBirth,
      preferredDate: formData.preferredDate,
      healthConcern: formData.healthConcern || formData.additionalDetails,
      documents: formData.documents.map((name) => ({ name, url: '#', uploadedAt: new Date().toISOString() }))
    }
    
    addApplication(newApp)
    setSubmittedApp(newApp)
    setIsSubmitting(false)
  }

  const handleFileUpload = () => {
    const fileNames = ['Valid ID', 'Proof of Residency', 'Medical Referral', 'Birth Certificate']
    const selected = fileNames[Math.floor(Math.random() * fileNames.length)]
    setFormData(prev => ({ ...prev, documents: [...prev.documents, `${selected}_${Date.now()}.pdf`] }))
  }

  if (submittedApp) {
    return (
      <div className="min-h-screen bg-bg-page py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary-900 px-8 py-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Application Submitted to GovServe Services</h2>
        <p className="text-primary-100 mt-1">Your application has been received by the GS Services Health Department and is pending review.</p>
      </div>
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-8">
                 <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                   <h3 className="font-bold text-primary-900">GovServe Services Application Details</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Application No.</p>
                      <p className="text-lg font-bold text-primary-900 font-mono">{submittedApp.applicationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Service</p>
                      <p className="text-lg font-semibold text-primary-900">{submittedApp.subServiceName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Applicant</p>
                      <p className="text-lg font-semibold text-primary-900">{submittedApp.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                      <p className="text-lg font-semibold text-primary-900">{new Date(submittedApp.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <StatusBadge status={submittedApp.status} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <p className="text-lg font-semibold text-primary-900">{submittedApp.categoryTitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate(`/application/${submittedApp.id}`)}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  View Full Details
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(`/services/${category.id}`)}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Back to Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors font-medium">Home</button>
            <span className="text-gray-300">/</span>
            <button onClick={() => navigate(`/services/${category.id}`)} className="hover:text-primary-600 transition-colors font-medium">{category.title}</button>
            <span className="text-gray-300">/</span>
            <span className="text-primary-900 font-medium">{subService.name}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 ${theme.bg} rounded-2xl flex items-center justify-center text-4xl flex-shrink-0`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight">{subService.name}</h1>
              <p className="text-gray-600 mt-3 text-lg leading-relaxed max-w-3xl">{subService.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary-900 px-8 py-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Application Form</h2>
              </div>
              <div className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Full Name / Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Juan Dela Cruz"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        QCitizen / Resident ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.idNumber}
                        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="QC-0000-0000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="09123456789"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="juan@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                         placeholder="123 GovServe Ave, GovServe City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Barangay <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.barangay}
                        onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Barangay</option>
                        <option value="Bagumbayan">Bagumbayan</option>
                        <option value="Batasan Hills">Batasan Hills</option>
                        <option value="Commonwealth">Commonwealth</option>
                        <option value="Culiat">Culiat</option>
                        <option value="Diliman">Diliman</option>
                        <option value="Don Manuel">Don Manuel</option>
                        <option value="E. Rodriguez">E. Rodriguez</option>
                        <option value="Kamuning">Kamuning</option>
                        <option value="Kapasigan">Kapasigan</option>
                        <option value="Katipunan">Katipunan</option>
                        <option value="Loyola Heights">Loyola Heights</option>
                        <option value="Malaya">Malaya</option>
                        <option value="Mariana">Mariana</option>
                        <option value="Masagana">Masagana</option>
                        <option value="New Era">New Era</option>
                        <option value="Old Capitol Site">Old Capitol Site</option>
                        <option value="Pinyahan">Pinyahan</option>
                        <option value="Project 4">Project 4</option>
                        <option value="Quezon Hill">Quezon Hill</option>
                        <option value="Roxas">Roxas</option>
                        <option value="San Antonio">San Antonio</option>
                        <option value="San Isidro">San Isidro</option>
                        <option value="San Jose">San Jose</option>
                        <option value="San Roque">San Roque</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Santa Lucia">Santa Lucia</option>
                        <option value="Santa Monica">Santa Monica</option>
                        <option value="Santo Cristo">Santo Cristo</option>
                        <option value="Sikatuna">Sikatuna</option>
                        <option value="South Triangle">South Triangle</option>
                        <option value="Tagalag">Tagalag</option>
                        <option value="Talayan">Talayan</option>
                        <option value="Tatalon">Tatalon</option>
                        <option value="Teachers Village">Teachers Village</option>
                        <option value="U.P. Campus">U.P. Campus</option>
                        <option value="U.P. Village">U.P. Village</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Vasra">Vasra</option>
                        <option value="West Triangle">West Triangle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Health Concern / Additional Details
                    </label>
                    <textarea
                      value={formData.healthConcern || formData.additionalDetails}
                      onChange={(e) => setFormData({ ...formData, healthConcern: e.target.value, additionalDetails: e.target.value })}
                      rows={4}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Please describe your concern or additional details..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Supporting Documents <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer bg-gray-50" onClick={handleFileUpload}>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                    </div>
                    {formData.documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.documents.map((doc, i) => (
                          <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{doc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {subService.requirements.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Required documents:</p>
                        <ul className="space-y-1">
                          {subService.requirements.map((req, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-primary-500 mt-0.5">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${theme.btn} ${theme.btnHover} text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/services/${category.id}`)}
                      className="px-8 py-3.5 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="bg-primary-900 px-6 py-4">
                   <h3 className="font-bold text-white text-sm uppercase tracking-wider">GovServe Service Information</h3>
                </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Fee</p>
                  <p className="text-lg font-bold text-primary-900">{subService.fee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Processing Time</p>
                  <p className="text-sm font-medium text-gray-700">{subService.processingTime}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-2">Requirements</p>
                  <ul className="space-y-2">
                    {subService.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-primary-500 mt-0.5">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

              <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white font-bold">i</span>
                  </div>
                  <p className="text-sm text-primary-800 leading-relaxed">
                     <strong>GovServe Services Privacy Notice:</strong> Your data is encrypted and handled in accordance with the GovServe Services Privacy Policy. Location and document data are stored securely with automatic 7-year retention per government regulations.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
