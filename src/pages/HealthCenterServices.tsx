import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Stethoscope,
  Clock,
  ArrowLeft,
  Calendar,
  FileText,
  TestTube,
  Building2,
  CheckCircle2,
  Info,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Search,
} from 'lucide-react'

// Types
type ServiceTab = 'consultation' | 'lab' | 'certificate'

interface HealthCenter {
  id: string
  name: string
  district: string
  address: string
  openHours: string
  availableDoctors: number
}

const HEALTH_CENTERS: HealthCenter[] = [
  {
    id: 'hc-1',
    name: 'District 1 Main Health Center',
    district: 'District 1',
    address: 'Roosevelt Ave, Quezon City',
    openHours: '8:00 AM - 5:00 PM',
    availableDoctors: 4,
  },
  {
    id: 'hc-2',
    name: 'Batasan Hills Super Health Center',
    district: 'District 2',
    address: 'IBP Road, Batasan Hills, Quezon City',
    openHours: '24/7 Emergency & Outpatient',
    availableDoctors: 8,
  },
  {
    id: 'hc-3',
    name: 'Cubao Community Health Center',
    district: 'District 3',
    address: 'E. Rodriguez Sr. Ave, Cubao, Quezon City',
    openHours: '8:00 AM - 5:00 PM',
    availableDoctors: 3,
  },
  {
    id: 'hc-4',
    name: 'Kamuning Health Center',
    district: 'District 4',
    address: 'Kamuning Rd, Quezon City',
    openHours: '8:00 AM - 5:00 PM',
    availableDoctors: 5,
  },
]

export default function HealthCenterServicesPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ServiceTab>('consultation')
  const [selectedCenter, setSelectedCenter] = useState<string>(HEALTH_CENTERS[0].id)
  const [centerSearch, setCenterSearch] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '09:00',
    reasonForVisit: '',
    testType: 'CBC (Complete Blood Count)',
    certificateType: 'Medical Clearance for Employment',
  })

  const filteredCenters = HEALTH_CENTERS.filter(
    (c) =>
      c.name.toLowerCase().includes(centerSearch.toLowerCase()) ||
      c.district.toLowerCase().includes(centerSearch.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-200">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                Health Center Services
              </h1>
              <p className="text-xs text-[#64748B]">
                Request medical consultations, laboratory tests, and health certificates from local health centers.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowInfoModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#F1F5F9] hover:bg-[#F8FAFC] text-[#334155] rounded-2xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Info className="w-4 h-4 text-[#2563EB]" />
          <span>Service Information</span>
        </button>
      </div>

      {/* Processing Time Banner (Reflecting card details) */}
      <div className="bg-[#EBF2FE] border border-blue-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#2563EB] flex items-center justify-center shrink-0 shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Estimated Processing Time
            </h3>
            <p className="text-sm font-semibold text-[#1D4ED8] mt-0.5">
              Same day for consultations • 1–2 days for official health certificates
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#2563EB] text-xs font-bold shadow-sm border border-blue-100 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" /> Direct Health Center Access
        </span>
      </div>

      {submitted ? (
        /* Success State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0F172A]">Request Submitted Successfully!</h2>
            <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
              Your appointment request has been logged. Please present your reference code at the assigned health center on your selected appointment date.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] inline-block text-left max-w-xs w-full space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Reference Code
            </p>
            <p className="text-lg font-mono font-extrabold text-[#2563EB]">
              HC-2026-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-2xl transition-all"
            >
              Submit Another Request
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-[#F1F5F9] hover:bg-slate-200 text-[#334155] text-xs font-semibold rounded-2xl transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* Request Workspace Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Type Selection Tabs */}
            <div className="bg-white rounded-3xl p-2 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('consultation')}
                className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'consultation'
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span className="hidden sm:inline">Medical</span> Consultation
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('lab')}
                className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'lab'
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                <TestTube className="w-4 h-4" />
                Laboratory Test
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('certificate')}
                className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'certificate'
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                <FileText className="w-4 h-4" />
                Health Certificate
              </button>
            </div>

            {/* Request Form Container */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">
                  {activeTab === 'consultation' && 'Schedule Consultation'}
                  {activeTab === 'lab' && 'Request Laboratory Service'}
                  {activeTab === 'certificate' && 'Apply for Health Certificate'}
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Fill in your preferred schedule and details to confirm your health center appointment.
                </p>
              </div>

              {/* Dynamic Service Specific Fields */}
              {activeTab === 'consultation' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2">
                      Reason for Consultation / Symptoms
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.reasonForVisit}
                      onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                      placeholder="Briefly describe your medical concern or reason for visit..."
                      className="w-full p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'lab' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2">
                      Select Required Test
                    </label>
                    <select
                      value={formData.testType}
                      onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
                      className="w-full p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option>CBC (Complete Blood Count)</option>
                      <option>Urinalysis & Fecalysis</option>
                      <option>Chest X-Ray Screening</option>
                      <option>Fasting Blood Sugar (FBS)</option>
                      <option>Sputum Microscopy</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'certificate' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2">
                      Certificate Purpose
                    </label>
                    <select
                      value={formData.certificateType}
                      onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                      className="w-full p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option>Medical Clearance for Employment</option>
                      <option>Food Handler Certificate</option>
                      <option>School / Enrollment Health Clearance</option>
                      <option>General Health Fitness Certificate</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Schedule Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="08:00">08:00 AM - 10:00 AM</option>
                    <option value="10:00">10:00 AM - 12:00 PM</option>
                    <option value="13:00">01:00 PM - 03:00 PM</option>
                    <option value="15:00">03:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#F1F5F9]">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2"
                >
                  <span>Confirm & Submit Request</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Side Column: Health Center Picker */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">Select Health Center</h3>
                <p className="text-xs text-[#64748B]">Choose your nearest facility</p>
              </div>

              {/* Center Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={centerSearch}
                  onChange={(e) => setCenterSearch(e.target.value)}
                  placeholder="Search location or district..."
                  className="w-full pl-10 pr-3 py-2 bg-[#F8FAFC] border border-[#F1F5F9] text-xs font-medium text-[#0F172A] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              {/* Centers List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredCenters.map((hc) => {
                  const isSelected = selectedCenter === hc.id
                  return (
                    <div
                      key={hc.id}
                      onClick={() => setSelectedCenter(hc.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-[#EBF2FE] border-[#2563EB] shadow-sm'
                          : 'bg-white border-[#F1F5F9] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#0F172A]">{hc.name}</h4>
                        {isSelected && (
                          <span className="w-2 h-2 bg-[#2563EB] rounded-full shrink-0 mt-1" />
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                        <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <span className="truncate">{hc.address}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] pt-1 text-[#64748B] font-medium border-t border-slate-100">
                        <span>{hc.openHours}</span>
                        <span className="text-[#2563EB] font-bold">
                          {hc.availableDoctors} Doctors On Duty
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Requirements Box */}
            <div className="bg-[#09101d] text-white rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#2563EB]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Important Reminder
                </h4>
              </div>
              <ul className="text-xs text-[#CBD5E1] space-y-2 list-disc pl-4 leading-relaxed">
                <li>Bring a valid government-issued ID upon arrival.</li>
                <li>Fasting for 8-10 hours is required for blood chemistry tests.</li>
                <li>Physical certificates require doctor sign-off at the center.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-[#0F172A] text-base">
                  Health Center Services Overview
                </h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-[#64748B] hover:text-[#0F172A] font-bold text-sm p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#334155] leading-relaxed">
              <p>
                Health Center Services allow registered residents to easily book consultations, lab work, and retrieve health clearances directly from their local municipal health centers.
              </p>
              <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9]">
                <h4 className="font-bold text-[#0F172A]">Key Timelines:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Medical Consultation:</strong> Same day availability</li>
                  <li><strong>Laboratory Results:</strong> 24 to 48 hours</li>
                  <li><strong>Health Certificate Issuance:</strong> 1 to 2 business days</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full py-3 bg-[#2563EB] text-white text-xs font-bold rounded-2xl hover:bg-blue-700 transition-colors"
            >
              Close Information
            </button>
          </div>
        </div>
      )}
    </div>
  )
}