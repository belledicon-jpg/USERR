import { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  HeartPulse,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  PhoneCall,
  ExternalLink,
} from 'lucide-react'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    setProfileOpen(false)
    logout()
    navigate('/')
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-[#0F172A] antialiased">
      {/* Top Banner */}
      <div className="bg-[#09101d] text-slate-300 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span className="font-semibold tracking-wide uppercase text-white">
              Official Health & Sanitation Services Portal
            </span>
          </div>
          <span className="hidden sm:inline text-[#CBD5E1]">
            Department of Public Health & Environmental Sanitation
          </span>
        </div>
      </div>

      {/* Minimal Top Navbar */}
      <header className="bg-white border-b border-[#F1F5F9] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-[#0F172A] text-lg tracking-tight">
              GovServe <span className="text-[#2563EB]">Health</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-2xl transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
            </button>

            <div className="h-6 w-px bg-[#F1F5F9]" />

            {/* User Profile Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-[#0F172A]">{user?.name || 'Valued Citizen'}</p>
                  <p className="text-[10px] text-[#64748B] font-medium">{user?.department || 'Public Access'}</p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-[#09101d] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <ChevronDown className="w-4 h-4 text-[#64748B]" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#F1F5F9] py-2 z-50">
                  <div className="px-4 py-3 bg-[#F8FAFC] mx-2 rounded-2xl mb-2">
                    <p className="text-xs font-bold text-[#0F172A] truncate">{user?.name || 'Valued Citizen'}</p>
                    <p className="text-[11px] text-[#64748B] truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/profile') }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC]"
                  >
                    <User className="w-4 h-4 text-[#64748B]" /> Account Profile
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/preferences') }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC]"
                  >
                    <Settings className="w-4 h-4 text-[#64748B]" /> Settings
                  </button>
                  <div className="my-1 border-t border-[#F1F5F9]" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <footer className="bg-[#09101d] text-white border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#2563EB]" />
                <span className="font-bold text-white text-sm">Health & Sanitation Portal</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Official digital channel for sanitary permits, health certificates, and public inspections.
              </p>
            </div>

            <div className="space-y-1 text-xs text-[#CBD5E1]">
              <p className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Government Hotlines</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-3.5 h-3.5 text-[#2563EB]" /> Emergency Health: 1-800-GOV-HEALTH</p>
              <p>Sanitation Helpdesk: (02) 8888-0000</p>
            </div>

            <div className="text-xs text-[#94A3B8] space-y-1">
              <p className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Legal & Privacy</p>
              <p className="hover:text-white cursor-pointer transition-colors">Data Privacy Notice</p>
              <p className="hover:text-white cursor-pointer transition-colors">Citizen Charter Agreement</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-3">
            <p>© {new Date().getFullYear()} Department of Health & Sanitation Services.</p>
            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              Official Portal <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}