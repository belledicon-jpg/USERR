import type { ServiceModule, ServiceCategory, SubService } from '../types'

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'health-center',
    title: 'Health Center Services',
    description: 'Request medical consultations, laboratory tests, and health certificates from QC health centers.',
    longDescription: 'Access comprehensive healthcare services through the GS Services Health Department network of health centers, super health centers, and specialized clinics.',
    icon: '🏥',
    colorTheme: 'blue',
    bgColor: 'bg-blue-50',
    eligibility: [
      'All QCitizens and residents of GovServe City',
      'Valid QCitizen ID or government-issued ID',
      'Registered at the barangay health center (for subsidized services)'
    ],
    requirements: [
      'Valid government-issued ID',
      'Proof of residency (utility bill, barangay clearance)',
      'Medical referral (for specialist services)'
    ],
    fees: [
      { service: 'Consultation', amount: 'Free' },
      { service: 'Laboratory Tests', amount: '₱50 - ₱500' },
      { service: 'Health Certificate', amount: '₱75 - ₱212' }
    ],
    processingTime: 'Same day for consultation; 1-2 days for certificates',
    subServices: [
      { id: 'consultation', name: 'Apply for Consultation', description: 'Request a medical consultation with a licensed physician at GovServe health centers', fee: 'Free', requirements: ['Valid ID', 'QCitizen ID'], processingTime: 'Same day' },
      { id: 'laboratory', name: 'Request Laboratory Test', description: 'Request blood tests, urinalysis, X-ray, and other diagnostics at GovServe laboratories', fee: '₱50 - ₱500', requirements: ['Doctor\'s referral', 'Valid ID'], processingTime: '1-3 days' },
      { id: 'health-certificate', name: 'Request Health Certificate', description: 'Apply for a health certificate for employment or business purposes', fee: '₱75 - ₱212', requirements: ['Valid ID', 'Application Form', 'Lab results (new)'], processingTime: '1-2 days' },
      { id: 'medical-appointment', name: 'View Medical Appointment', description: 'View and manage your scheduled medical appointments', fee: 'Free', requirements: ['Appointment reference'], processingTime: 'Instant' },
      { id: 'application-status', name: 'View Application Status', description: 'Check the status of your health center applications', fee: 'Free', requirements: ['Reference number'], processingTime: 'Instant' }
    ],
    actionableButtons: [
      { label: 'Apply for Consultation', type: 'primary', action: 'apply' },
      { label: 'Request Laboratory Test', type: 'secondary', action: 'apply' },
      { label: 'View Application Status', type: 'outline', action: 'tracking' }
    ],
    dashboardFeatures: [
      'Upcoming appointments',
      'Lab results ready',
      'Health certificate status',
      'Prescription refills',
      'Barangay health center locator'
    ]
  },
  {
    id: 'sanitation-permit',
    title: 'Sanitation Permit & Inspection',
    description: 'Apply for sanitation permits, request facility inspections, and renew business health clearances.',
    longDescription: 'Ensure your business meets health and sanitation standards. Apply for sanitary permits, schedule inspections, and maintain compliance with local health regulations through GovServe Services.',
    icon: '🧼',
    colorTheme: 'green',
    bgColor: 'bg-emerald-50',
    eligibility: [
      'All business owners and food establishment operators in GovServe City',
      'Valid business permit from City Hall',
      'DTI registration (for single proprietorships)'
    ],
    requirements: [
      'DTI/SEC registration',
      'Business permit',
      'Floor plan of establishment',
      'Sanitation plan',
      'Valid government ID of owner'
    ],
    fees: [
      { service: 'Sanitary Permit', amount: '₱500 - ₱2,000' },
      { service: 'Inspection', amount: '₱300' },
      { service: 'Re-inspection', amount: '₱200' }
    ],
    processingTime: '3-5 business days for permit approval',
    subServices: [
      { id: 'permit-new', name: 'Apply for Sanitation Permit', description: 'Apply for a new sanitation permit for your business establishment', fee: '₱500 - ₱2,000', requirements: ['Business Permit', 'DTI/SEC Reg', 'Floor Plan', 'Sanitation Plan'], processingTime: '3-5 days' },
      { id: 'permit-renewal', name: 'Renew Sanitary Permit', description: 'Renew your existing sanitary permit', fee: '₱500 - ₱2,000', requirements: ['Business Permit', 'Previous SP', 'Valid ID'], processingTime: '3-5 days' },
      { id: 'inspection-schedule', name: 'Schedule Inspection', description: 'Request a sanitation inspection for your establishment', fee: '₱300', requirements: ['Business Permit', 'DTI Registration', 'Valid ID'], processingTime: '2-3 days' },
      { id: 'inspection-result', name: 'View Inspection Result', description: 'Access your inspection results and compliance report', fee: 'Free', requirements: ['Reference number'], processingTime: 'Instant' }
    ],
    actionableButtons: [
      { label: 'Apply for Permit', type: 'primary', action: 'apply' },
      { label: 'Schedule Inspection', type: 'secondary', action: 'apply' },
      { label: 'Check Status', type: 'outline', action: 'tracking' }
    ],
    dashboardFeatures: [
      'Permit application status',
      'Inspection schedules',
      'Compliance certificates',
      'Violation notices',
      'Permit renewal reminders'
    ]
  },
  {
    id: 'immunization-nutrition',
    title: 'Immunization & Nutrition Tracker',
    description: 'Track child immunization records, schedule vaccination appointments, and access nutrition monitoring forms.',
    longDescription: 'The GovServe City Government provides free immunization and nutrition services for children, pregnant women, and senior citizens through QC VAX Easy and the GovServe nutrition program.',
    icon: '💉',
    colorTheme: 'orange',
    bgColor: 'bg-orange-50',
    eligibility: [
      'All children 0-59 months old',
      'Pregnant women',
      'Senior citizens',
      'All residents of GovServe City'
    ],
    requirements: [
      'Birth certificate (for children)',
      'Valid government ID (for adults)',
      'Previous immunization record (if available)',
      'QCitizen ID'
    ],
    fees: [
      { service: 'Vaccination', amount: 'Free' },
      { service: 'Nutrition Assessment', amount: 'Free' },
      { service: 'Growth Monitoring', amount: 'Free' }
    ],
    processingTime: 'Same day for vaccination',
    subServices: [
      { id: 'child-enrollment', name: 'Enroll Child in Immunization Program', description: 'Register a child for routine immunization and vaccination programs', fee: 'Free', requirements: ['Birth certificate', 'Valid ID', 'QCitizen ID'], processingTime: 'Instant' },
      { id: 'vaccination-schedule', name: 'Schedule Vaccination', description: 'Schedule a vaccination appointment for an enrolled child', fee: 'Free', requirements: ['Patient ID', 'Vaccination card'], processingTime: 'Instant' },
      { id: 'vaccination-record', name: 'View Vaccination Record', description: 'View and update vaccination records through QC VAX Easy', fee: 'Free', requirements: ['QCitizen ID', 'Patient Record'], processingTime: 'Instant' },
      { id: 'nutrition-monitoring', name: 'Nutrition Monitoring', description: 'Submit nutrition assessment and monitoring forms for children', fee: 'Free', requirements: ['Patient ID', 'Growth chart'], processingTime: '30 minutes' },
      { id: 'view-schedule', name: 'View Vaccination Schedule', description: 'View upcoming vaccination schedules for enrolled children', fee: 'Free', requirements: ['Patient ID'], processingTime: 'Instant' }
    ],
    actionableButtons: [
      { label: 'Enroll Child', type: 'primary', action: 'apply' },
      { label: 'Schedule Vaccination', type: 'secondary', action: 'apply' },
      { label: 'View Records', type: 'outline', action: 'records' }
    ],
    dashboardFeatures: [
      'Vaccination schedules',
      'Growth charts',
      'Nutrition status',
      'Reminder alerts',
      'Immunization coverage reports'
    ]
  },
  {
    id: 'wastewater-septic',
    title: 'Wastewater & Septic Services',
    description: 'Apply for septic tank desludging, request wastewater discharge permits, and report drainage issues.',
    longDescription: 'The GovServe Environmental Sanitation Division handles septic tank desludging, wastewater complaints, and sanitation inspections for all GovServe City residents and businesses.',
    icon: '🚰',
    colorTheme: 'navy',
    bgColor: 'bg-indigo-50',
    eligibility: [
      'All residential and commercial property owners in GovServe City',
      'Valid property tax declaration',
      'Proof of residency or business registration'
    ],
    requirements: [
      'Valid government ID',
      'Proof of property ownership/tenancy',
      'Location/GPS coordinates of property',
      'Photos of septic tank (if applicable)'
    ],
    fees: [
      { service: 'Septic Tank Desludging', amount: 'Free (first time)' },
      { service: 'Wastewater Complaint', amount: 'Free' },
      { service: 'Additional Desludging', amount: '₱500' }
    ],
    processingTime: '3-5 business days for scheduling',
    subServices: [
      { id: 'septic-desludging', name: 'Request Desludging Service', description: 'Request free septic tank desludging service from GovServe', fee: 'Free (first time)', requirements: ['Valid ID', 'Proof of residency', 'Property photos'], processingTime: '3-5 days' },
      { id: 'wastewater-permit', name: 'Apply for Wastewater Permit', description: 'Apply for a wastewater discharge permit for your establishment', fee: 'Free', requirements: ['Business Permit', 'Site Plan', 'Wastewater Management Plan'], processingTime: '5-7 days' },
      { id: 'drainage-issue', name: 'Report Drainage Issue', description: 'Report wastewater issues, leaks, or contamination to GovServe', fee: 'Free', requirements: ['Valid ID', 'Location', 'Photos/description'], processingTime: '1-2 days' },
      { id: 'inspection-request', name: 'Request Inspection', description: 'Request a sanitation inspection for your property or business', fee: 'Free', requirements: ['Valid ID', 'Property details'], processingTime: '2-3 days' },
      { id: 'track-service', name: 'Track Service Request', description: 'Check the status of your desludging or inspection request', fee: 'Free', requirements: ['Reference number'], processingTime: 'Instant' }
    ],
    actionableButtons: [
      { label: 'Request Desludging', type: 'primary', action: 'apply' },
      { label: 'Report Issue', type: 'secondary', action: 'apply' },
      { label: 'Track Status', type: 'outline', action: 'tracking' }
    ],
    dashboardFeatures: [
      'Service requests',
      'Scheduled desludging',
      'Complaint tracking',
      'Inspection records',
      'Service history'
    ]
  },
  {
    id: 'health-surveillance',
    title: 'Health Surveillance System',
    description: 'Report disease outbreaks, submit health inspection reports, and access epidemiological data dashboards.',
    longDescription: 'The GovServe City Epidemiology and Disease Surveillance Division monitors public health trends, reports disease outbreaks, and provides real-time health statistics across GovServe City barangays.',
    icon: '📊',
    colorTheme: 'purple',
    bgColor: 'bg-violet-50',
    eligibility: [
      'Health workers and barangay health center staff',
      'City health department personnel',
      'Authorized researchers and analysts',
      'GovServe authorized personnel'
    ],
    requirements: [
      'Official government/health institution ID',
      'Authorization letter (for researchers)',
      'Data request form'
    ],
    fees: [
      { service: 'Standard Report', amount: 'Free' },
      { service: 'Custom Report', amount: '₱200' }
    ],
    processingTime: 'Instant access to public data; 1-2 days for custom reports',
    subServices: [
      { id: 'disease-report', name: 'Submit Disease Report', description: 'Report a suspected disease outbreak or unusual health incident', fee: 'Free', requirements: ['Health worker ID', 'Incident details'], processingTime: 'Instant' },
      { id: 'health-incident', name: 'Report Health Incident', description: 'Submit a health incident report to the City Epidemiology Division', fee: 'Free', requirements: ['Health worker ID', 'Incident details'], processingTime: 'Instant' },
      { id: 'surveillance-data', name: 'Upload Surveillance Data', description: 'Upload epidemiological surveillance data and reports', fee: 'Free', requirements: ['Official ID', 'Data files'], processingTime: 'Instant' },
      { id: 'view-dashboard', name: 'View Surveillance Dashboard', description: 'Access real-time health surveillance dashboards and maps', fee: 'Free', requirements: ['Official ID'], processingTime: 'Instant' },
      { id: 'track-report', name: 'Track Submitted Report', description: 'Track the status of your submitted disease or incident reports', fee: 'Free', requirements: ['Report reference number'], processingTime: 'Instant' }
    ],
    actionableButtons: [
      { label: 'Submit Disease Report', type: 'primary', action: 'apply' },
      { label: 'Report Health Incident', type: 'secondary', action: 'apply' },
      { label: 'View Dashboard', type: 'outline', action: 'view' }
    ],
    dashboardFeatures: [
      'Disease surveillance maps',
      'Real-time alerts',
      'Barangay health indices',
      'Trend analysis',
      'Weekly/monthly reports'
    ]
  }
]

export const serviceModules: ServiceModule[] = serviceCategories.map(cat => ({
  id: cat.id,
  title: cat.title,
  description: cat.description,
  longDescription: cat.longDescription,
  icon: cat.icon,
  colorTheme: cat.colorTheme,
  bgColor: cat.bgColor,
  eligibility: cat.eligibility,
  requirements: cat.requirements,
  fees: cat.fees,
  processingTime: cat.processingTime,
  actionableButtons: cat.actionableButtons,
  dashboardFeatures: cat.dashboardFeatures,
  subServices: cat.subServices
}))

export function getServiceCategory(id: string): ServiceCategory | undefined {
  return serviceCategories.find(cat => cat.id === id)
}

export function getSubService(categoryId: string, subServiceId: string): { category: ServiceCategory; subService: SubService } | undefined {
  const category = getServiceCategory(categoryId)
  if (!category) return undefined
  const subService = category.subServices.find((s) => s.id === subServiceId)
  if (!subService) return undefined
  return { category, subService }
}
