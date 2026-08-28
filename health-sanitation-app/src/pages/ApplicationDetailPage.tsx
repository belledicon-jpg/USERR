import { useParams, useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext'
import StatusBadge from '../components/StatusBadge'
import { ArrowLeft, FileText, MapPin, Phone, Mail, Calendar, User, Clock, CheckCircle2, Circle } from 'lucide-react'

const statusSteps = [
  { key: 'submitted', label: 'Application Submitted' },
  { key: 'under-review', label: 'Documents Verified' },
  { key: 'inspection-scheduled', label: 'Inspection Scheduled' },
  { key: 'inspection-completed', label: 'Inspection Completed' },
  { key: 'assessment-completed', label: 'Assessment Completed' },
  { key: 'approved', label: 'Approved' },
  { key: 'completed', label: 'Completed' }
]

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getApplication } = useApplications()

  const application = getApplication(id || '')

  if (!application) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Application Not Found</h1>
          <p className="text-gray-600 mb-8">The application you are looking for does not exist.</p>
          <button onClick={() => navigate('/')} className="text-primary-600 font-semibold hover:text-primary-700">
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const currentStatusIndex = statusSteps.findIndex(s => s.key === application.status)

  return (
    <div className="min-h-screen bg-bg-page py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-primary-900 px-8 py-6 flex items-center justify-between">
              <div>
                 <h2 className="text-2xl font-bold text-white tracking-tight">GovServe Services Application Details</h2>
                <p className="text-primary-100 mt-1">{application.applicationNumber}</p>
              </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Status</p>
                <StatusBadge status={application.status} />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Submitted</p>
                <p className="text-sm font-semibold text-primary-900">
                  {new Date(application.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h3 className="font-bold text-primary-900">Applicant Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Applicant Name</p>
                      <p className="text-sm font-semibold text-primary-900">{application.applicantName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-primary-900">{application.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Contact Number</p>
                      <p className="text-sm font-semibold text-primary-900">{application.contactNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-semibold text-primary-900">{application.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Barangay</p>
                      <p className="text-sm font-semibold text-primary-900">{application.barangay}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Preferred Date</p>
                      <p className="text-sm font-semibold text-primary-900">
                        {application.preferredDate ? new Date(application.preferredDate).toLocaleDateString() : 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h3 className="font-bold text-primary-900">Application Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Service</p>
                    <p className="text-sm font-semibold text-primary-900">{application.subServiceName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="text-sm font-semibold text-primary-900">{application.categoryTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Application Number</p>
                    <p className="text-sm font-mono font-semibold text-primary-900">{application.applicationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                    <p className="text-sm font-semibold text-primary-900">
                      {new Date(application.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h3 className="font-bold text-primary-900 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Application Tracking
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-0">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStatusIndex
                    const isCurrent = idx === currentStatusIndex
                    return (
                      <div key={step.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCurrent ? 'bg-primary-600 text-white' :
                            isCompleted ? 'bg-emerald-100 text-emerald-600' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {isCompleted && !isCurrent ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : isCurrent ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </div>
                          {idx < statusSteps.length - 1 && (
                            <div className={`w-0.5 h-12 ${isCompleted ? 'bg-emerald-200' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className="pb-8">
                          <p className={`text-sm font-semibold ${isCurrent ? 'text-primary-900' : isCompleted ? 'text-emerald-700' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-gray-500 mt-1">Current stage</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {application.healthConcern && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                  <h3 className="font-bold text-primary-900">Additional Details</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-700">{application.healthConcern}</p>
                </div>
              </div>
            )}

            {application.documents.length > 0 && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                  <h3 className="font-bold text-primary-900">Supporting Documents</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {application.documents.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">i</span>
                </div>
                <p className="text-sm text-primary-800 leading-relaxed">
                  <strong>Next Steps:</strong> Your application is currently <strong>{application.status.replace('-', ' ')}</strong>.
                  You will be notified via email when there are updates. You can check the status of your application anytime by visiting this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}