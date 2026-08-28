import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ApplicationProvider } from './context/ApplicationContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthGuard from './components/AuthGuard'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import DashboardLayout from './pages/DashboardLayout'
import ModuleView from './pages/ModuleView'
import ServiceCategoryPage from './pages/ServiceCategoryPage'
import ApplicationFormPage from './pages/ApplicationFormPage'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import AdminDashboard from './pages/AdminDashboard'
import FAQPage from './pages/FAQPage'
import PrivacyPage from './pages/PrivacyPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/dashboard" element={
                <AuthGuard>
                  <DashboardLayout />
                </AuthGuard>
              } />
              <Route path="/module/:id" element={
                <AuthGuard>
                  <ModuleView />
                </AuthGuard>
              } />
              <Route path="/services/:categoryId" element={
                <AuthGuard>
                  <ServiceCategoryPage />
                </AuthGuard>
              } />
              <Route path="/apply/:categoryId/:subServiceId" element={
                <AuthGuard>
                  <ApplicationFormPage />
                </AuthGuard>
              } />
              <Route path="/application/:id" element={
                <AuthGuard>
                  <ApplicationDetailPage />
                </AuthGuard>
              } />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ApplicationProvider>
    </AuthProvider>
  )
}
