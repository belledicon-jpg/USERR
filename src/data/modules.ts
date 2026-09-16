export const mockDashboardStats = {
  totalRequests: 12,
  pending: 3,
  underReview: 4,
  inspectionScheduled: 2,
  assessmentCompleted: 1,
  approved: 1,
  rejected: 0,
  completed: 1,
  aiRemindersActive: 5
}

export const mockRequests = [
  {
    id: '1',
    referenceNumber: 'HC-2026-001',
    moduleId: 'health-center',
    type: 'Medical Consultation',
    status: 'under-review',
    submittedAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-08-22T14:00:00Z',
    applicantName: 'Maria Santos',
    address: '123 Katipunan Ave, GovServe City',
    amount: 'Free',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2026-08-20T10:00:00Z', note: 'Consultation request submitted via GovServe Services', actor: 'Maria Santos' },
      { id: '2', status: 'under-review', timestamp: '2026-08-22T14:00:00Z', note: 'Under review by GovServe health center', actor: 'Dr. Reyes' }
    ],
    documents: [
      { id: '1', name: 'Valid_ID.pdf', type: 'application/pdf', url: '#', uploadedAt: '2026-08-20T10:00:00Z' }
    ]
  },
  {
    id: '2',
    referenceNumber: 'SP-2026-002',
    moduleId: 'sanitation-permit',
    type: 'New Sanitary Permit Application',
    status: 'completed',
    submittedAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-20T11:00:00Z',
    applicantName: 'Juan Dela Cruz',
    address: '456 Quezon Ave, GovServe City',
    amount: '₱1,500.00',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2026-08-15T09:00:00Z', note: 'Application submitted via GovServe Services', actor: 'Juan Dela Cruz' },
      { id: '2', status: 'under-review', timestamp: '2026-08-16T10:00:00Z', note: 'Under review by GovServe Sanitation Division', actor: 'Sanitarian Garcia' },
      { id: '3', status: 'inspection-scheduled', timestamp: '2026-08-18T14:00:00Z', note: 'Inspection scheduled at establishment', actor: 'Inspector Lim' },
      { id: '4', status: 'approved', timestamp: '2026-08-19T09:00:00Z', note: 'Sanitary permit approved', actor: 'Dr. Obmerga' },
      { id: '5', status: 'completed', timestamp: '2026-08-20T11:00:00Z', note: 'Permit released and available for download', actor: 'GovServe Releasing Clerk' }
    ],
    documents: [
      { id: '1', name: 'Business_Permit.pdf', type: 'application/pdf', url: '#', uploadedAt: '2026-08-15T09:00:00Z' },
      { id: '2', name: 'DTI_Registration.pdf', type: 'application/pdf', url: '#', uploadedAt: '2026-08-15T09:05:00Z' }
    ]
  },
  {
    id: '3',
    referenceNumber: 'IM-2026-003',
    moduleId: 'immunization-nutrition',
    type: 'Child Immunization Enrollment',
    status: 'completed',
    submittedAt: '2026-08-10T08:00:00Z',
    updatedAt: '2026-08-10T10:30:00Z',
    applicantName: 'Ana Reyes',
    address: '789 Commonwealth Ave, GovServe City',
    amount: 'Free',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2026-08-10T08:00:00Z', note: 'Child enrollment submitted', actor: 'Ana Reyes' },
      { id: '2', status: 'approved', timestamp: '2026-08-10T09:00:00Z', note: 'Enrollment approved by health center', actor: 'Nurse Vasquez' },
      { id: '3', status: 'completed', timestamp: '2026-08-10T10:30:00Z', note: 'First vaccination administered', actor: 'Nurse Vasquez' }
    ],
    documents: [
      { id: '1', name: 'Birth_Certificate.pdf', type: 'application/pdf', url: '#', uploadedAt: '2026-08-10T08:00:00Z' }
    ]
  },
  {
    id: '4',
    referenceNumber: 'WS-2026-004',
    moduleId: 'wastewater-septic',
    type: 'Septic Tank Desludging Request',
    status: 'pending',
    submittedAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z',
    applicantName: 'Pedro Garcia',
    address: '321 Tandang Sora Ave, GovServe City',
    amount: 'Free',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2026-08-25T10:00:00Z', note: 'Desludging request submitted', actor: 'Pedro Garcia' }
    ],
    documents: [
      { id: '1', name: 'Valid_ID.pdf', type: 'application/pdf', url: '#', uploadedAt: '2026-08-25T10:00:00Z' },
      { id: '2', name: 'Property_Photo.jpg', type: 'image/jpeg', url: '#', uploadedAt: '2026-08-25T10:05:00Z' }
    ]
  },
  {
    id: '5',
    referenceNumber: 'HS-2026-005',
    moduleId: 'health-surveillance',
    type: 'Disease Outbreak Report',
    status: 'under-review',
    submittedAt: '2026-08-26T14:00:00Z',
    updatedAt: '2026-08-27T09:00:00Z',
    applicantName: 'Dr. Lim',
    address: 'GovServe City Epidemiology Division, GovServe City',
    amount: 'Free',
    timeline: [
      { id: '1', status: 'submitted', timestamp: '2026-08-26T14:00:00Z', note: 'Disease report submitted', actor: 'Dr. Lim' },
      { id: '2', status: 'under-review', timestamp: '2026-08-27T09:00:00Z', note: 'Under review by epidemiology team', actor: 'Dr. De Guzman' }
    ],
    documents: [
      { id: '1', name: 'Medical_Report.pdf', type: 'application/pdf', url: '#', uploadedAt: '2026-08-26T14:00:00Z' }
    ]
  }
]

export const mockInspections = [
  {
    id: '1',
    requestId: 'SP-2026-002',
    scheduledAt: '2026-08-25T09:00:00Z',
    inspectorName: 'Sanitarian Lim',
    status: 'completed',
    checklist: { 'Proper waste disposal': true, 'Cleanliness': true, 'Food safety': true, 'Ventilation': true },
    photos: ['inspection1.jpg', 'inspection2.jpg'],
    notes: 'Establishment passed all GovServe sanitation inspection criteria.',
    completedAt: '2026-08-25T11:00:00Z'
  }
]

export const mockAssessments = [
  {
    id: '1',
    requestId: 'SP-2026-002',
    inspectionId: '1',
    score: 95,
    certified: true,
    violations: { critical: 0, major: 0, minor: 1 },
    correctiveActions: ['Replace worn-out door seal'],
    recommendations: ['Install additional handwashing station'],
    assessedAt: '2026-08-26T10:00:00Z',
    assessorName: 'Dr. Lim'
  }
]

export const mockAIReminders = [
  {
    id: '1',
    requestId: 'HC-2026-001',
    userId: '1',
    type: 'inspection-followup',
    priority: 'high',
    message: 'Your health certificate application requires corrective action by Sep 3, 2026. Please submit the required documents to GovServe.',
    channel: ['in-app', 'email'],
    scheduledAt: '2026-08-27T08:00:00Z',
    sentAt: '2026-08-27T08:00:00Z',
    status: 'sent'
  },
  {
    id: '2',
    requestId: 'SP-2026-002',
    userId: '1',
    type: 'permit-renewal',
    priority: 'medium',
    message: 'Your sanitary permit will expire in 30 days. Please renew through GovServe Services.',
    channel: ['in-app', 'sms'],
    scheduledAt: '2026-09-01T08:00:00Z',
    status: 'scheduled'
  }
]

export const mockNotifications = [
  {
    id: '1',
    userId: '1',
    title: 'Health Certificate Approved',
    message: 'Your health certificate application has been approved. Please visit GovServe Environmental Sanitation Division to claim.',
    channel: 'in-app',
    priority: 'medium',
    read: false,
    createdAt: '2026-08-15T11:00:00Z',
    linkTo: '/application/HC-2026-001'
  },
  {
    id: '2',
    userId: '1',
    title: 'Sanitary Permit Released',
    message: 'Your sanitary permit is ready for download. Log in to GovServe Services to download your permit.',
    channel: 'in-app',
    priority: 'high',
    read: true,
    createdAt: '2026-08-22T14:00:00Z',
    linkTo: '/module/sanitary-permit'
  }
]
