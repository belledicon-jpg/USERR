export type ServiceCategoryId =
  | 'health-center'
  | 'sanitation-permit'
  | 'immunization-nutrition'
  | 'wastewater-septic'
  | 'health-surveillance'

export type ApplicationStatus =
  | 'draft'
  | 'pending'
  | 'under-review'
  | 'approved'
  | 'rejected'
  | 'inspection-scheduled'
  | 'inspection-completed'
  | 'assessment-completed'
  | 'completed'
  | 'archived'
  | 'submitted'

export interface SubService {
  id: string
  categoryId: ServiceCategoryId
  name: string
  description: string
  fee: string
  requirements: string[]
  processingTime: string
}

export interface ServiceCategory {
  id: ServiceCategoryId
  title: string
  description: string
  icon: string
  colorTheme: string
  subServices: SubService[]
}

export interface Application {
  id: string
  applicationNumber: string
  subServiceId: string
  subServiceName: string
  categoryId: ServiceCategoryId
  categoryTitle: string
  status: ApplicationStatus
  submittedAt: string
  updatedAt: string
  applicantName: string
  email: string
  contactNumber: string
  address: string
  barangay: string
  dateOfBirth?: string
  preferredDate?: string
  healthConcern?: string
  documents: { name: string; url: string }[]
  assignedTo?: string
  scheduleDate?: string
  notes?: string
  formData?: Record<string, any>
}

export interface AdminView {
  pendingApplications: Application[]
  underReviewApplications: Application[]
  completedApplications: Application[]
}
