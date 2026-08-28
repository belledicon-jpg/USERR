# Health & Sanitation Management Module — UI/UX Design Specification

## QC E-Services Platform

---

## 1. Module Home Page Design

### 1.1 Page Title & Header
- **Title**: Welcome to Health & Sanitation Management
- **Subtitle**: Your digital gateway to public health services, sanitation permits, and wellness programs in Quezon City.
- **Breadcrumb**: Home > Services > Health & Sanitation Management

### 1.2 Hero Section
- **Background**: Clean, professional gradient (teal/cyan) with subtle city silhouette.
- **Intro Text** (max 80 words):
  > Access Quezon City's health and sanitation services online. Apply for permits, track immunization records, schedule inspections, and manage wastewater requests — all in one secure portal. Designed for residents, business owners, and health professionals.

### 1.3 Service Cards Dashboard (5 Cards)

| Card | Title | Icon | Color Theme |
|------|-------|------|-------------|
| 1 | Health Center Services | 🏥 | Blue |
| 2 | Sanitation Permit & Inspection | 🧹 | Green |
| 3 | Immunization & Nutrition Tracker | 💉 | Orange |
| 4 | Wastewater & Septic Services | 🚰 | Navy |
| 5 | Health Surveillance System | 📋 | Purple |

### 1.4 Dashboard Layout
- **Grid**: Responsive 3-column (desktop), 2-column (tablet), 1-column (mobile)
- **Card Features**:
  - Hover effect: lift + shadow
  - Quick stats badge (e.g., "2 pending requests")
  - Primary CTA button: "Enter Module"
  - Secondary link: "View Requirements"
- **Quick Links Sidebar** (right panel on desktop):
  - Announcements / Service Advisory
  - Contact Support
  - FAQ
  - Privacy Policy link

---

## 2. Detailed Service Card & Module Specifications

### 2.1 Module 1: Health Center Services

#### 2.1.1 Service Information
- **Description**: Request medical consultations, lab tests, and health certificates from QC health centers.
- **Eligibility**: All Quezon City residents with valid ID.
- **Requirements**:
  - Valid government-issued ID
  - Proof of residence (utility bill / barangay clearance)
  - Referral letter (for specialist consultation)
- **Fees**:
  - Consultation: Free / ₱50–₱200 (depending on service)
  - Laboratory tests: ₱100–₱1,500
- **Processing Time**: Same day to 3 working days.

#### 2.1.2 Actionable Elements
- **Apply for Consultation** (button)
- **Request Laboratory Test** (button)
- **Book Appointment** (button)
- **Download Health Certificate Template** (link)

#### 2.1.3 User Dashboard Features
- Upcoming appointments list
- Lab results viewer
- Medical certificate download
- Transaction history table (date, service, status, amount)

---

### 2.2 Module 2: Sanitation Permit & Inspection

#### 2.2.1 Service Information
- **Description**: Apply for sanitation permits, request facility inspections, and renew business health clearances.
- **Eligibility**: Business owners, food establishment operators, school administrators.
- **Requirements**:
  - Business permit / DTI registration
  - Floor plan / layout of facility
  - List of personnel with Food Handler's Certificate
  - Previous inspection report (for renewal)
- **Fees**: ₱300–₱2,000 (based on establishment type and size).
- **Processing Time**: 5–10 working days.

#### 2.2.2 Actionable Elements
- **Apply for Sanitation Permit** (button)
- **Schedule Inspection** (button)
- **Renew Business Health Clearance** (button)
- **Upload Facility Photos** (file upload component)
- **Track Application Status** (button)

#### 2.2.3 User Dashboard Features
- Active permits with expiration alerts
- Inspection schedule calendar
- Document upload portal
- Status timeline (Submitted → Under Review → Inspection Scheduled → Approved / Denied)

---

### 2.3 Module 3: Immunization & Nutrition Tracker

#### 2.3.1 Service Information
- **Description**: Track child immunization records, schedule vaccination appointments, and access nutrition monitoring forms.
- **Eligibility**: Parents/guardians of children 0–59 months; pregnant women.
- **Requirements**:
  - Child's birth certificate / PhilHealth ID
  - Mother's ID (for prenatal services)
  - Previous immunization card (for continuation)
- **Fees**: Free (government program).
- **Processing Time**: Instant enrollment; vaccination per schedule.

#### 2.3.2 Actionable Elements
- **Enroll Child in Immunization Program** (button)
- **Schedule Vaccination** (button)
- **View Immunization Card** (digital badge)
- **Download Nutrition Checklist** (link)
- **Set Appointment Reminder** (toggle + button)

#### 2.3.3 User Dashboard Features
- Digital immunization card with QR verification
- Growth chart (weight/height tracker)
- Upcoming vaccination schedule
- Notification center (reminders, advisories)

---

### 2.4 Module 4: Wastewater & Septic Services

#### 2.4.1 Service Information
- **Description**: Apply for septic tank desludging, request wastewater discharge permits, and report drainage issues.
- **Eligibility**: Residential and commercial property owners in Quezon City.
- **Requirements**:
  - Property title / tax declaration
  - Proof of payment of previous desludging (if applicable)
  - Location sketch / GPS coordinates
  - Photos of septic tank access point
- **Fees**:
  - Desludging: Free (for residential, every 5 years) / ₱500–₱2,000 (commercial)
  - Wastewater discharge permit: ₱1,000–₱5,000
- **Processing Time**: 3–7 working days.

#### 2.4.2 Actionable Elements
- **Request Desludging Service** (button)
- **Apply for Wastewater Permit** (button)
- **Report Drainage Issue** (button with map picker)
- **Check Desludging Schedule** (link to calendar)
- **Upload Property Photos** (file upload component)

#### 2.4.3 User Dashboard Features
- Service request status (Pending → Scheduled → Completed)
- Desludging history log
- Permit download center
- Map view of service routes / scheduled dates

---

### 2.5 Module 5: Health Surveillance System

#### 2.5.1 Service Information
- **Description**: Report disease outbreaks, submit health inspection reports, and access epidemiological data dashboards for barangay health workers.
- **Eligibility**: Barangay health workers, medical professionals, LGUs, accredited NGOs.
- **Requirements**:
  - Barangay / institutional ID
  - Incident report form
  - Supporting documents (lab results, patient logs)
- **Fees**: No fee (government health program).
- **Processing Time**: 24–72 hours for incident response.

#### 2.5.2 Actionable Elements
- **Submit Disease Report** (button)
- **Upload Surveillance Data** (file upload)
- **Access Epidemiological Dashboard** (button with restricted access)
- **Download Surveillance Forms** (link)
- **Request Data Clarification** (button)

#### 2.5.3 User Dashboard Features
- Report submission tracker
- Dashboard widgets (case counts, trend graphs)
- Restricted access log (who viewed/downloaded data)
- Audit trail for data entries

---

## 3. User Flow & Navigation Mapping

### 3.1 Generic Flow (Applicable to All Modules)

```
Landing Page
    ↓
[Select Service Card]
    ↓
Service Information Page
    - Description, Eligibility, Requirements, Fees
    ↓
[Click "Apply" / "Request" / "Schedule"]
    ↓
Authentication Check
    ↓
Eligibility Wizard (if first-time user)
    ↓
Application Form
    - Dynamic fields based on service
    - Document upload
    - Location/address input with map validation
    ↓
Review & Confirm
    ↓
Payment Gateway (if applicable)
    ↓
Confirmation Screen
    - Reference number
    - Next steps
    - Downloadable receipt
    ↓
User Dashboard
    - Track status
    - Receive notifications
    - Download certificates
```

### 3.2 Module-Specific Flows

#### Flow A: Health Center Services
1. Select **Health Center Services**
2. Choose: Consultation / Lab Test / Certificate
3. Fill patient details (name, DOB, address)
4. Select health center branch
5. Choose available schedule
6. Confirm → Receive appointment code
7. Dashboard: View appointment, receive SMS/email reminder

#### Flow B: Sanitation Permit & Inspection
1. Select **Sanitation Permit & Inspection**
2. Choose: New Application / Renewal / Inspection Only
3. Input business details (DTI, address, type)
4. Upload floor plan + facility photos
5. Pay processing fee
6. Inspector assigned → Schedule inspection
7. Dashboard: Inspector assigned, date confirmed, result posted

#### Flow C: Immunization & Nutrition Tracker
1. Select **Immunization & Nutrition Tracker**
2. Input child's details (name, DOB, PhilHealth)
3. Link to mother's profile
4. Select vaccination package
5. Choose nearest health center + date
6. QR digital card generated
7. Dashboard: Growth chart, next vaccine due, reminders

#### Flow D: Wastewater & Septic Services
1. Select **Wastewater & Septic Services**
2. Choose: Desludging / Discharge Permit / Report Issue
3. Input property details (title number, address)
4. Pin exact location on map
5. Upload septic tank photos
6. Submit → Receive tracking number
7. Dashboard: Truck schedule GPS tracker, completion certificate

#### Flow E: Health Surveillance System
1. Select **Health Surveillance System**
2. Login with institutional credentials
3. Choose report type: Outbreak / Inspection / Data Upload
4. Fill incident form with case counts, location, dates
5. Attach lab results / patient logs
6. Submit → Auto-escalation to concerned office
7. Dashboard: Response timeline, case map, data analytics

---

## 4. Data & Privacy Integration

### 4.1 Data Collection Fields by Module

| Field | Module 1 | Module 2 | Module 3 | Module 4 | Module 5 | Sensitivity |
|-------|----------|----------|----------|----------|----------|-------------|
| Full Name | ✓ | ✓ | ✓ | ✓ | ✓ | Low |
| Date of Birth | ✓ | | ✓ | | | High |
| Home Address | ✓ | ✓ | ✓ | ✓ | ✓ | High |
| Contact Number | ✓ | ✓ | ✓ | ✓ | ✓ | Medium |
| Email Address | ✓ | ✓ | ✓ | ✓ | ✓ | Medium |
| Government ID Number | ✓ | ✓ | ✓ | ✓ | ✓ | High |
| PhilHealth / SSS | | | ✓ | | | High |
| Business Registration | | ✓ | | | | Medium |
| Property Title / Tax Dec | | | | ✓ | | High |
| GPS Coordinates / Location Pin | | ✓ | | ✓ | ✓ | Medium |
| Photos / Documents Upload | | ✓ | ✓ | ✓ | ✓ | High |
| Medical History | ✓ | | ✓ | | | High |
| Financial Info (Payment) | ✓ | ✓ | | ✓ | | High |

### 4.2 Privacy & Security Measures

#### 4.2.1 Data Handling
- All PII (Personally Identifiable Information) encrypted at rest (AES-256) and in transit (TLS 1.3).
- Location data stored with anonymization options.
- Document uploads scanned for malware and stored in isolated cloud buckets.
- Automatic data retention policy: 7 years (per Philippine government records policy).

#### 4.2.2 User Consent & Transparency
- **Consent Banner**: Clear explanation of data collection purpose before form submission.
- **Privacy Modal**: Link to QC E-Services Privacy Policy accessible from every page footer.
- **Data Access Log**: Users can view who accessed their records and when.
- **Right to Erasure**: Deletion request button in user profile settings.

#### 4.2.3 Access Control
- Role-based access (Resident / Business Owner / Health Worker / Admin).
- Multi-factor authentication (SMS/Email OTP) for high-sensitivity modules (Surveillance, Payments).
- Session timeout after 15 minutes of inactivity.

---

## 5. Screen Transition & Component Specifications

### 5.1 Common Components
- **Navigation Bar**: Logo, Services dropdown, Dashboard link, Notifications bell, User avatar.
- **Footer**: Privacy Policy, Terms of Service, Contact, Accessibility.
- **Status Badges**: Pending (yellow), In Review (blue), Approved (green), Rejected (red).
- **Toast Notifications**: Success, Error, Warning, Info.
- **Modal Dialogs**: Confirm submission, Payment receipt, Eligibility check results.

### 5.2 Responsive Breakpoints
- **Desktop**: 1200px+ (full sidebar, 3-column grid)
- **Tablet**: 768px–1199px (collapsible sidebar, 2-column grid)
- **Mobile**: < 768px (hamburger menu, single column, bottom nav)

---

## 6. Success Metrics & Acceptance Criteria

### 6.1 Key Performance Indicators
- Service completion rate: > 85%
- Average session duration: < 10 minutes per transaction
- User satisfaction score (CSAT): > 4.2 / 5.0
- System uptime: 99.5%

### 6.2 Acceptance Criteria per Module
- [ ] User can complete application without calling support
- [ ] All required fields validated before submission
- [ ] Payment confirmation emailed within 2 minutes
- [ ] Dashboard updates status in real-time
- [ ] Digital certificates are verifiable via QR code
- [ ] Privacy policy accessible within 1 click from any screen

---

*Document Version: 1.0*
*Prepared for: QC E-Services Health & Sanitation Management Module*
*Status: Draft for Review*
