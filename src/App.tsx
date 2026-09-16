import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ApplicationProvider } from '@/context/ApplicationContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthGuard from '@/components/AuthGuard'
import HomePage from '@/pages/HomePage'
import SignInPage from '@/pages/SignInPage'
import DashboardLayout from '@/pages/DashboardLayout'
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

// Main Layout component for standard pages requiring Header + Footer
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
            {/* Standalone Route (No Navbar / Footer) */}
            <Route path="/signin" element={<SignInPage />} />

            {/* Standard Pages with Navbar & Footer */}
            <Route element={<MainLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Protected User Modules & Pages */}
              <Route element={<AuthGuard />}>
                <Route path="/dashboard" element={<DashboardLayout />} />
                <Route path="/module/:id" element={<ModuleView />} />
                <Route path="/services/:categoryId" element={<ServiceCategoryPage />} />
                <Route path="/apply/:categoryId/:subServiceId" element={<ApplicationFormPage />} />
                <Route path="/application/:id" element={<ApplicationDetailPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </AuthProvider>
  )
}