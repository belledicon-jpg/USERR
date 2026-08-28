import { useState } from 'react'
import { X, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface RequirementsModalProps {
  isOpen: boolean
  onClose: () => void
  category: {
    title: string
    requirements: string[]
    processingTime: string
    fees: { service: string; amount: string }[]
  }
  onApply: () => void
}

export default function RequirementsModal({ isOpen, onClose, category, onApply }: RequirementsModalProps) {
  const [confirmed, setConfirmed] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-900">Requirements Checklist</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Please make sure you have all required documents ready before submitting your application.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-3">Required Documents</h3>
            <div className="space-y-2">
              {category.requirements.map((req, i) => (
                <label key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <span className="text-sm text-gray-700">{req}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</p>
              </div>
              <p className="text-sm font-semibold text-primary-900">{category.processingTime}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-gray-500" />
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</p>
              </div>
              <p className="text-sm font-semibold text-primary-900">
                {category.fees.length > 0 ? category.fees[0].amount : 'Free'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                if (confirmed) {
                  onApply()
                  setConfirmed(false)
                  onClose()
                }
              }}
              disabled={!confirmed}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Now
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
