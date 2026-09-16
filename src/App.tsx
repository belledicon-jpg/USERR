import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ApplicationProvider } from '@/context/ApplicationContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthGuard from '@/components/AuthGuard'

// Pages
import HomePage from '@/pages/HomePage'
import SignInPage from '@/pages/SignInPage'
import DashboardLayout from '@/pages/DashboardLayout'
import DashboardPage from '@/pages/DashboardPage'
import ModuleView from '@/pages/ModuleView'
import ServiceCategoryPage from '@/pages/ServiceCategoryPage'
import ApplicationFormPage from '@/pages/ApplicationFormPage'
import ApplicationDetailPage from '@/pages/ApplicationDetailPage'
import AdminDashboard from '@/pages/AdminDashboard'
import FAQPage from '@/pages/FAQPage'
import PrivacyPage from '@/pages/PrivacyPage'
import ServicesPage from '@/pages/ServicesPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'

// Main Layout component for public pages requiring Navbar + Footer
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone Route */}
            <Route path="/" element={<SignInPage />} />

            {/* Standard Public Pages (Navbar & Footer) */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Route>

            {/* Protected Dashboard Routes (Wrapped in AuthGuard & DashboardLayout) */}
            <Route element={<AuthGuard />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/module/:id" element={<ModuleView />} />
                <Route path="/category/:id" element={<ServiceCategoryPage />} />
                <Route path="/apply/:id" element={<ApplicationFormPage />} />
                <Route path="/application/:id" element={<ApplicationDetailPage />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </AuthProvider>
  )
}