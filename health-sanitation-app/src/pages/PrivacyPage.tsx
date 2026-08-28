import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">Legal</span>
          <h1 className="text-4xl font-bold text-primary-900 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-600 mt-3 text-lg">How we collect, use, and protect your personal information.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 space-y-8 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-primary-900 mb-3">1. Data Collection</h2>
            <p className="leading-relaxed">We collect personal information necessary to process your service requests, including name, address, contact details, government ID numbers, and uploaded documents. Location data is collected only when required for service delivery.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-primary-900 mb-3">2. Data Usage</h2>
            <p className="leading-relaxed">Your data is used solely for processing transactions, verifying eligibility, and delivering services. We do not share your personal information with third parties without consent, except as required by law.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-primary-900 mb-3">3. Data Security</h2>
            <p className="leading-relaxed">All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Access is restricted to authorized personnel only. Document uploads are scanned for malware.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-primary-900 mb-3">4. Retention Period</h2>
            <p className="leading-relaxed">Records are retained for 7 years in compliance with Philippine government records policy, after which they are securely deleted.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-primary-900 mb-3">5. Your Rights</h2>
            <p className="leading-relaxed">You have the right to access, correct, or request deletion of your personal data. Contact info@healthsystem.gov.ph for data-related requests.</p>
          </section>
          <div className="pt-6 border-t border-gray-200">
            <Link to="/" className="text-primary-600 font-semibold hover:text-primary-700">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
