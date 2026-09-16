import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gov-900 text-gov-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center text-gov-900 font-bold text-sm">
                GS
              </div>
              <span className="font-bold text-white text-xl tracking-tight">GovServe Services</span>
            </div>
            <p className="text-sm text-gov-400 max-w-sm leading-relaxed">
              The official digital gateway for GovServe government services. Secure, accessible, and designed for every citizen.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-xs text-gov-400 uppercase tracking-wider font-medium">All systems operational</span>
            </div>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gov-400 hover:text-accent-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gov-400 hover:text-accent-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gov-400 hover:text-accent-400 transition-colors">About Us</Link></li>
              <li><Link to="/dashboard" className="text-gov-400 hover:text-accent-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/contact" className="text-gov-400 hover:text-accent-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-gov-400 hover:text-accent-400 transition-colors">Privacy Policy</Link></li>
              <li><span className="text-gov-400">Terms of Service</span></li>
              <li><span className="text-gov-400">Accessibility</span></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gov-400">Hotline: (02) 8988-4242</li>
              <li className="text-gov-400">cityhealth@quezoncity.gov.ph</li>
              <li className="text-gov-400">GovServe City Hall, Gate 4</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gov-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gov-500">© 2026 GovServe Government. All rights reserved.</p>
          <p className="text-xs text-gov-600">Version 2.0 — GS Services Health Department</p>
        </div>
      </div>
    </footer>
  )
}
