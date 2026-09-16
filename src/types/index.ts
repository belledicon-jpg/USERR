export interface ServiceModule {
  id: string
  title: string
  description: string
  longDescription: string
  icon: string
  colorTheme: string
  bgColor: string
  eligibility: string[]
  requirements: string[]
  fees: { service: string; amount: string }[]
  processingTime: string
  actionableButtons: ActionableButton[]
  dashboardFeatures: string[]
  subServices: SubService[]
}

export interface ServiceCategory {
  id: string
  title: string
  description: string
  longDescription: string
  icon: string
  colorTheme: string
  bgColor: string
  eligibility: string[]
  requirements: string[]
  fees: { service: string; amount: string }[]
  processingTime: string
  subServices: SubService[]
  actionableButtons: ActionableButton[]
  dashboardFeatures: string[]
}

export interface SubService {
  id: string
  name: string
  description: string
  fee: string
  requirements: string[]
  processingTime: string
}

export interface ActionableButton {
  label: string
  type: 'primary' | 'secondary' | 'outline'
  action: string
}

export interface ApplicationFormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'file' | 'location'
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface Transaction {
  id: string
  moduleId: string
  service: string
  date: string
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'completed'
  amount?: string
  referenceNumber: string
}

export interface UserProfile {
  fullName: string
  email: string
  contactNumber: string
  address: string
  idNumber: string
}
