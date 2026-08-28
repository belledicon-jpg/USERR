export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">GovServe Services Support</span>
          <h1 className="text-4xl font-bold text-primary-900 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-3 text-lg">Find answers to common questions about GS Services Health Department services.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
         {[
          { q: 'How do I apply for a service?', a: 'Select the service module from the homepage, review requirements, fill out the application form, and submit through GovServe Services. You will receive a reference number for tracking.' },
          { q: 'Are the services free?', a: 'Many services are free (immunization, surveillance, residential desludging). Others have minimal processing fees as indicated in each GovServe module.' },
          { q: 'How can I track my application?', a: 'Sign in and visit the Dashboard page to view all your GovServe Services transactions, their current status, and reference numbers.' },
          { q: 'Is my data secure?', a: 'Yes. All data is encrypted in transit and at rest. We comply with the GovServe Services Privacy Policy and applicable data protection laws.' },
          { q: 'Can I download my certificates?', a: 'Yes. Approved certificates and permits are available for download in your Dashboard under the respective GovServe module.' }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-primary-900 mb-3 text-lg">{item.q}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
