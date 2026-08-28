import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockRequests, mockInspections, mockAssessments, mockNotifications, mockAIReminders } from '../data/modules'
import { useApplications } from '../context/ApplicationContext'
import StatusBadge from '../components/StatusBadge'
import { Stethoscope, ClipboardList, ShieldCheck, Activity, FileText, Bell, BellRing, User } from 'lucide-react'

const tabs = [
  { id: 'application', label: 'Application', icon: Stethoscope },
  { id: 'inspection', label: 'Inspection', icon: ClipboardList },
  { id: 'assessment', label: 'Assessment', icon: ShieldCheck },
  { id: 'tracking', label: 'Tracking', icon: Activity },
  { id: 'records', label: 'Records', icon: FileText },
  { id: 'ai-followup', label: 'AI Follow-up', icon: Bell },
  { id: 'notifications', label: 'Notifications', icon: BellRing },
  { id: 'profile', label: 'Profile', icon: User }
]

export default function ModuleView() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('application')
  const navigate = useNavigate()
  const { applications } = useApplications()

  const renderContent = () => {
    switch (activeTab) {
      case 'application':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <h3 className="text-xl font-bold text-primary-900 mb-6">My GovServe Services Applications</h3>
               {applications.length === 0 ? (
                 <div className="text-center py-12">
                   <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <FileText className="w-6 h-6 text-gray-400" />
                   </div>
                   <p className="text-gray-500 mb-4">No applications yet.</p>
                    <button onClick={() => navigate(`/services/${id}`)} className="text-primary-600 font-semibold hover:text-primary-700">
                      Browse QC Services
                    </button>
                 </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-primary-900">{app.subServiceName}</h4>
                          <p className="text-sm text-gray-500 mt-1">{app.applicationNumber}</p>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Submitted</p>
                          <p className="font-medium text-primary-900">{new Date(app.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Updated</p>
                          <p className="font-medium text-primary-900">{new Date(app.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Category</p>
                          <p className="font-medium text-primary-900">{app.categoryTitle}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Documents</p>
                          <p className="font-medium text-primary-900">{app.documents.length} files</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 'inspection':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Inspections</h3>
              <div className="space-y-4">
                {mockInspections.map((insp) => (
                  <div key={insp.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary-900">Inspection {insp.id}</h4>
                        <p className="text-sm text-gray-500 mt-1">Request: {insp.requestId}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        insp.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        insp.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {insp.status}
                      </span>
                    </div>
                    {insp.status === 'completed' && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {Object.entries(insp.checklist).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${value ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            <span className={value ? 'text-gray-700' : 'text-red-600 font-medium'}>{key}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {insp.notes && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{insp.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'assessment':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Assessment & Compliance</h3>
              <div className="space-y-4">
                {mockAssessments.map((asm) => (
                  <div key={asm.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary-900">Assessment {asm.id}</h4>
                        <p className="text-sm text-gray-500 mt-1">Request: {asm.requestId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-900">{asm.score}%</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-red-700">{asm.violations.critical}</p>
                        <p className="text-xs text-red-600">Critical</p>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-amber-700">{asm.violations.major}</p>
                        <p className="text-xs text-amber-600">Major</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-blue-700">{asm.violations.minor}</p>
                        <p className="text-xs text-blue-600">Minor</p>
                      </div>
                    </div>
                    {asm.correctiveActions.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-primary-900 mb-2">Corrective Actions</p>
                        <ul className="space-y-1">
                          {asm.correctiveActions.map((action, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-primary-500 mt-0.5">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {asm.recommendations.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">Recommendations</p>
                        <ul className="space-y-1">
                          {asm.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-primary-500 mt-0.5">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'tracking':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Application Status Tracking</h3>
              <div className="space-y-4">
                {mockRequests.map((req) => (
                  <div key={req.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary-900">{req.type}</h4>
                        <p className="text-sm text-gray-500">{req.referenceNumber}</p>
                      </div>
                      <StatusBadge status={req.status} />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {['submitted', 'under-review', 'inspection-scheduled', 'inspection-completed', 'assessment-completed', 'completed'].map((status, idx) => {
                        const statusOrder = ['submitted', 'under-review', 'inspection-scheduled', 'inspection-completed', 'assessment-completed', 'completed']
                        const currentIdx = statusOrder.indexOf(req.status)
                        const isActive = idx <= currentIdx
                        const isCurrent = status === req.status
                        return (
                          <div key={status} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              isCurrent ? 'bg-primary-600 text-white' :
                              isActive ? 'bg-primary-100 text-primary-700' :
                              'bg-gray-100 text-gray-400'
                            }`}>
                              {idx + 1}
                            </div>
                            {idx < statusOrder.length - 1 && (
                              <div className={`w-12 h-1 rounded-full ${idx < currentIdx ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-4 space-y-2">
                      {req.timeline.slice().reverse().map((event) => (
                        <div key={event.id} className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span className="text-gray-600">{event.note}</span>
                          <span className="text-gray-400 ml-auto">{new Date(event.timestamp).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'records':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Records & History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Reference</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono text-primary-900 font-semibold">{req.referenceNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{req.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(req.submittedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                        <td className="px-6 py-4 text-sm text-gray-700">{req.amount || 'Free'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'ai-followup':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">AI Follow-up Reminders</h3>
              <div className="space-y-4">
                {mockAIReminders.map((reminder) => (
                  <div key={reminder.id} className={`border rounded-xl p-6 ${
                    reminder.priority === 'critical' ? 'border-red-200 bg-red-50' :
                    reminder.priority === 'high' ? 'border-amber-200 bg-amber-50' :
                    'border-primary-200 bg-primary-50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                          reminder.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          reminder.priority === 'high' ? 'bg-amber-100 text-amber-700' :
                          'bg-primary-100 text-primary-700'
                        }`}>
                          {reminder.priority}
                        </span>
                        <h4 className="font-semibold text-primary-900 capitalize">{reminder.type.replace(/-/g, ' ')}</h4>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        reminder.status === 'sent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        reminder.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {reminder.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{reminder.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Scheduled: {new Date(reminder.scheduledAt).toLocaleString()}</span>
                      <span>Channels: {reminder.channel.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Notifications</h3>
              <div className="space-y-3">
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className={`border rounded-xl p-5 ${notif.read ? 'border-gray-200 bg-white' : 'border-primary-200 bg-primary-50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          notif.priority === 'critical' ? 'bg-red-100' :
                          notif.priority === 'high' ? 'bg-amber-100' :
                          'bg-primary-100'
                        }`}>
                          <Bell className={`w-4 h-4 ${
                            notif.priority === 'critical' ? 'text-red-600' :
                            notif.priority === 'high' ? 'text-amber-600' :
                            'text-primary-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary-900">{notif.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Profile & Account</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">Full Name</label>
                    <input type="text" defaultValue="Juan Dela Cruz" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">Email</label>
                    <input type="email" defaultValue="juan.delacruz@example.com" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">Contact Number</label>
                    <input type="tel" defaultValue="09123456789" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">Address</label>
                     <input type="text" defaultValue="123 GovServe Ave, GovServe City" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm" />
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-primary-900 mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'inApp', label: 'In-App Notifications', checked: true },
                      { key: 'email', label: 'Email Notifications', checked: true },
                      { key: 'sms', label: 'SMS Notifications', checked: true },
                      { key: 'push', label: 'Push Notifications', checked: false }
                    ].map((pref) => (
                      <label key={pref.key} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked={pref.checked} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                    Save Changes
                  </button>
                  <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-900 tracking-tight">Services</h1>
            <p className="text-gray-600 mt-1">Manage all your health and sanitation services in one place.</p>
          </div>
          <button
            onClick={() => navigate(`/services/${id}`)}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            New Application
          </button>
        </div>
          <h1 className="text-3xl font-bold text-primary-900 tracking-tight">Services</h1>
          <p className="text-gray-600 mt-1">Manage all your health and sanitation services in one place.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-700 bg-primary-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
