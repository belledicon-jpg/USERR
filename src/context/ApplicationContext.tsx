import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Application } from '../types/services'

interface ApplicationContextType {
  applications: Application[]
  addApplication: (application: Application) => void
  updateApplicationStatus: (id: string, status: Application['status'], updates?: Partial<Application>) => void
  getApplication: (id: string) => Application | undefined
  saveDraft: (draft: Omit<Application, 'id' | 'applicationNumber' | 'status' | 'submittedAt' | 'updatedAt'>) => void
  drafts: Omit<Application, 'id' | 'applicationNumber' | 'status' | 'submittedAt' | 'updatedAt'>[]
  removeDraft: (index: number) => void
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([])
  const [drafts, setDrafts] = useState<Omit<Application, 'id' | 'applicationNumber' | 'status' | 'submittedAt' | 'updatedAt'>[]>([])

  const addApplication = (application: Application) => {
    setApplications(prev => [...prev, application])
  }

  const updateApplicationStatus = (id: string, status: Application['status'], updates?: Partial<Application>) => {
    setApplications(prev => prev.map(app =>
      app.id === id
        ? { ...app, status, updatedAt: new Date().toISOString(), ...updates }
        : app
    ))
  }

  const getApplication = (id: string) => applications.find(app => app.id === id)

  const saveDraft = (draft: Omit<Application, 'id' | 'applicationNumber' | 'status' | 'submittedAt' | 'updatedAt'>) => {
    setDrafts(prev => [...prev, draft])
  }

  const removeDraft = (index: number) => {
    setDrafts(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <ApplicationContext.Provider value={{ applications, addApplication, updateApplicationStatus, getApplication, saveDraft, drafts, removeDraft }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplications() {
  const context = useContext(ApplicationContext)
  if (!context) throw new Error('useApplications must be used within ApplicationProvider')
  return context
}
