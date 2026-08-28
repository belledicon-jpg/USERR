import { CheckCircle2 } from 'lucide-react'

const coreValues = [
  { title: 'Accessibility', description: 'Services available to all community members' },
  { title: 'Efficiency', description: 'Streamlined digital processes' },
  { title: 'Security', description: 'Protected data and privacy' },
  { title: 'Community', description: 'Built for the people we serve' },
  { title: 'Accountability', description: 'Transparent operations and tracking' },
  { title: 'Better Health', description: 'Improved outcomes for all' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 tracking-tight mb-4">GS Services Health Department</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Building a healthier and safer community through accessible and reliable health and sanitation services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary-900 tracking-tight mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide accessible, efficient, and reliable health and sanitation services to the community through a centralized digital platform.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-primary-900 px-8 py-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Mission Focus</h3>
            </div>
            <div className="p-8">
              <p className="text-gray-600 leading-relaxed">
                We bridge the gap between health personnel, sanitation officers, and community members by providing a unified system that simplifies service delivery, reduces paperwork, and ensures every resident can access essential health and sanitation services without unnecessary barriers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-primary-900 px-8 py-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Vision</h3>
            </div>
            <div className="p-8">
              <p className="text-gray-600 leading-relaxed">
                A healthier and safer community where people can conveniently access essential healthcare, sanitation, immunization, environmental, and public health services anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-primary-900 tracking-tight mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A healthier and safer community where people can conveniently access essential healthcare, sanitation, immunization, environmental, and public health services.
            </p>
          </div>
        </div>

        <div>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-lg font-bold text-primary-900">{value.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-primary-900 px-8 py-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Our Purpose</h3>
            </div>
            <div className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The GS Services Health Department Management System provides a centralized platform for managing community health and sanitation services. It helps health personnel, sanitation officers, and community members access and manage essential services more efficiently.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By digitizing permit applications, inspection scheduling, immunization tracking, and disease surveillance, we reduce processing time, improve transparency, and ensure that critical health services reach the people who need them most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
