export type ModuleId =
  | 'application'
  | 'inspection'
  | 'assessment'
  | 'tracking'
  | 'records'
  | 'ai-followup'
  | 'notifications'
  | 'profile'
  | 'immunization'

export type RequestStatus =
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'inspection-scheduled'
  | 'inspection-completed'
  | 'assessment-completed'
  | 'approved'
  | 'rejected'
  | 'completed'
  | 'archived'

export type NotificationChannel = 'in-app' | 'email' | 'sms' | 'push'
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical'

export interface HealthRequest {
  id: string
  referenceNumber: string
  moduleId: ModuleId
  type: string
  status: RequestStatus
  submittedAt: string
  updatedAt: string
  applicantName: string
  address: string
  amount?: string
  timeline: TimelineEvent[]
  documents: Document[]
}

export interface TimelineEvent {
  id: string
  status: RequestStatus
  timestamp: string
  note: string
  actor: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
}

export interface Inspection {
  id: string
  requestId: string
  scheduledAt: string
  inspectorName: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'verified'
  checklist: Record<string, boolean>
  photos: string[]
  notes: string
  completedAt?: string
}

export interface Assessment {
  id: string
  requestId: string
  inspectionId: string
  score: number
  certified: boolean
  violations: {
    critical: number
    major: number
    minor: number
  }
  correctiveActions: string[]
  recommendations: string[]
  assessedAt: string
  assessorName: string
}

export interface AIReminder {
  id: string
  requestId: string
  userId: string
  type: string
  priority: NotificationPriority
  message: string
  channel: NotificationChannel[]
  scheduledAt: string
  sentAt?: string
  status: 'scheduled' | 'sent' | 'read' | 'resolved' | 'expired'
  metadata?: Record<string, unknown>
}

export interface NotificationItem {
  id: string
  userId: string
  title: string
  message: string
  channel: NotificationChannel
  priority: NotificationPriority
  read: boolean
  createdAt: string
  linkTo?: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  contactNumber: string
  address: string
  role: 'resident' | 'business-owner' | 'health-worker' | 'admin'
  notificationPreferences: {
    inApp: boolean
    email: boolean
    sms: boolean
    push: boolean
  }
  createdAt: string
}

export interface DashboardStats {
  totalRequests: number
  pending: number
  underReview: number
  inspectionScheduled: number
  assessmentCompleted: number
  approved: number
  rejected: number
  completed: number
  aiRemindersActive: number
}
