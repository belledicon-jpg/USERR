# Health & Sanitation Management System — System Architecture & Product Design Specification

**Project**: GovServe — Health & Sanitation Management Module  
**Version**: 2.0  
**Status**: Architecture Draft  
**Date**: 2026-08-27

---

## 1. System Architecture Refinement

### 1.1 Refined Module Hierarchy

The proposed modules are reorganized into a **user-centric, dependency-aware hierarchy**:

```
┌─────────────────────────────────────────────────────────────┐
│                     GovServe Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Application │───▶│  Inspection │───▶│  Assessment │     │
│  │  Module     │    │   Module    │    │   Module    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Profile   │    │  Tracking   │    │   Records   │     │
│  │   Module    │    │   Module    │    │   Module    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            ▼                                │
│              ┌─────────────────────────┐                    │
│              │   AI Follow-up Engine   │                    │
│              │   (Async, Event-Driven) │                    │
│              └─────────────────────────┘                    │
│                            │                                │
│                            ▼                                │
│                   ┌─────────────┐                           │
│                   │ Notification│                           │
│                   │   Module    │                           │
│                   └─────────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Module Dependency Map

| Module | Depends On | Produces For |
|--------|-----------|--------------|
| **Application** | Profile (user identity) | Inspection requests |
| **Inspection** | Application | Assessment records |
| **Assessment** | Inspection | Compliance status, Tracking updates |
| **Tracking** | Assessment | Records, AI triggers |
| **Records** | All modules | Historical queries |
| **AI Follow-up** | Assessment + Tracking events | Notifications |
| **Notifications** | AI Follow-up | User actions |
| **Profile** | None | All modules (user context) |

### 1.3 Data Ownership Model

- **User-owned**: Profile, Applications, Notifications
- **System-generated**: Inspection schedules, Assessment scores, AI recommendations
- **Shared/Immutable**: Records (append-only audit trail)

---

## 2. Feature Specification

### 2.1 Module Details

#### 2.1.1 Application Module
- **Purpose**: Entry point for all service requests
- **Core Entities**: ServiceRequest, ApplicantInfo, Attachments
- **States**: Draft → Submitted → Under Review → Approved/Rejected
- **Integration Points**:
  - Creates Inspection record upon approval
  - Triggers Profile validation
  - Generates initial Tracking entry

#### 2.1.2 Inspection Module
- **Purpose**: Schedule, assign, and conduct field inspections
- **Core Entities**: InspectionSchedule, InspectorAssignment, FieldChecklist, PhotoEvidence
- **States**: Scheduled → In Progress → Completed → Verified
- **Integration Points**:
  - Consumes Application data
  - Produces raw inspection data for Assessment
  - Creates GPS-coded location records

#### 2.1.3 Assessment & Compliance Module
- **Purpose**: Evaluate inspection results against regulatory standards
- **Core Entities**: ComplianceScore, ViolationList, CorrectiveActions, Certificate
- **States**: Pending Evaluation → Compliant / Non-Compliant → Certified / Denied
- **Key Logic**:
  - Weighted scoring algorithm (health risk 40%, sanitation 35%, documentation 25%)
  - Automatic threshold triggers for AI escalation
  - Certificate generation upon full compliance

#### 2.1.4 Tracking Module
- **Purpose**: Real-time status visibility for all user requests
- **Core Entities**: StatusTimeline, MilestoneEvent, SLAMonitor
- **States**: Active → Paused → Completed → Archived
- **Integration Points**:
  - Receives status updates from all upstream modules
  - Publishes events to AI Follow-up engine
  - Feeds Records module

#### 2.1.5 Records Module
- **Purpose**: Immutable audit trail and historical reporting
- **Core Entities**: TransactionLog, DocumentArchive, AuditEntry
- **Features**:
  - Append-only ledger
  - Full-text search across all modules
  - Exportable compliance reports (PDF, CSV)
  - Retention policy enforcement (7 years)

#### 2.1.6 AI Follow-up Reminder Module
- **Purpose**: Proactive, context-aware nudges to reduce abandonment and ensure compliance
- **Core Entities**: ReminderRule, TriggerEvent, NotificationTemplate, UserFeedback
- **Architecture**: Event-driven, rules-engine + lightweight ML scoring
- **Integration**: Subscribes to Tracking and Assessment events

#### 2.1.7 Notification Module
- **Purpose**: Multi-channel message delivery
- **Channels**: In-app, Email, SMS, Push
- **Core Entities**: NotificationQueue, DeliveryLog, PreferenceSettings
- **Features**:
  - Template engine with variable interpolation
  - Retry logic with exponential backoff
  - User preference management per channel

#### 2.1.8 Profile Module
- **Purpose**: User identity and context management
- **Core Entities**: UserAccount, Organization, Role, AddressBook
- **Features**:
  - Single sign-on (SSO) integration
  - Role-based access control (RBAC)
  - Session management and audit

---

### 2.2 Critical Interaction: Assessment & Compliance ↔ AI Follow-up

#### 2.2.1 Data Flow Contract

```
Assessment Module
    │
    │ 1. Publishes: AssessmentCompletedEvent
    │    { requestId, complianceScore, violations, certified, timestamp }
    │
    ▼
AI Follow-up Engine
    │
    │ 2. Evaluates against RuleSet
    │    - IF certified == false AND violations.critical > 0
    │      → Trigger: ImmediateEscalationRule
    │    - IF certified == true AND complianceScore < 80
    │      → Trigger: ConditionalComplianceRule
    │    - IF inspectionDate + 30 days AND no followup
    │      → Trigger: PeriodicCheckRule
    │
    │ 3. Generates: ReminderTask
    │    { userId, channel, templateId, scheduledAt, priority }
    │
    ▼
Notification Module
    │
    │ 4. Delivers: Notification
    │
    ▼
User Action
    │
    │ 5. User submits corrective docs / schedules re-inspection
    │
    ▼
Assessment Module
    │
    │ 6. Re-evaluates → New AssessmentCompletedEvent
    │
    ▼
AI Follow-up Engine
    │
    │ 7. Closes loop → ReminderTask marked RESOLVED
```

#### 2.2.2 Integration Contracts

| Event | Publisher | Subscriber | Payload |
|-------|-----------|------------|---------|
| `AssessmentCompletedEvent` | Assessment | AI Follow-up | `{ requestId, score, violations, certified, userId }` |
| `StatusChangedEvent` | Tracking | AI Follow-up | `{ requestId, oldStatus, newStatus, timestamp }` |
| `ReminderScheduledEvent` | AI Follow-up | Notification | `{ userId, template, channel, scheduledAt }` |
| `NotificationDeliveredEvent` | Notification | AI Follow-up | `{ reminderId, channel, deliveredAt }` |
| `UserActionEvent` | UI / API | AI Follow-up | `{ requestId, actionType, timestamp }` |

---

## 3. Workflow Optimization

### 3.1 Overall User Process (State Machine)

```
                    ┌──────────┐
                    │  Guest   │
                    └────┬─────┘
                         │ Sign Up / Login
                         ▼
                    ┌──────────┐
              ┌────▶│ Authenticated │
              │     └────┬─────┘
              │          │ Browse Services
              │          ▼
              │     ┌──────────┐
              │     │  Browsing │
              │     └────┬─────┘
              │          │ Select Service
              │          ▼
              │     ┌──────────────┐
              │     │ Application   │◀────┐
              │     │   Created     │     │
              │     └────┬──────────┘     │
              │          │ Submit         │ Re-edit
              │          ▼                │
              │     ┌──────────────┐     │
              │     │   Submitted   │─────┘
              │     └────┬──────────┘
              │          │ Admin Review
              │          ▼
              │     ┌──────────────┐
              │     │   Approved   │
              │     └────┬──────────┘
              │          │ Schedule Inspection
              │          ▼
              │     ┌──────────────┐
              │     │ Inspection   │
              │     │  Scheduled   │
              │     └────┬──────────┘
              │          │ Field Work
              │          ▼
              │     ┌──────────────┐
              │     │   Data       │
              │     │  Collected   │
              │     └────┬──────────┘
              │          │ Upload Evidence
              │          ▼
              │     ┌──────────────┐
              │     │   Under      │
              │     │ Assessment   │
              │     └────┬──────────┘
              │          │ Scoring Engine
              │          ▼
              │     ┌──────────────┐
              │     │  Assessment  │
              │     │  Completed   │
              │     └────┬──────────┘
              │          │
              │     ┌────┴────┐
              │     ▼         ▼
              │  ┌───────┐ ┌───────────┐
              │  │Pass   │ │Fail       │
              │  └───┬───┘ └─────┬─────┘
              │      │           │
              │      ▼           ▼
              │  ┌───────┐ ┌───────────┐
              │  │Cert.  │ │Follow-up  │
              │  │Issued │ │Required   │
              │  └───┬───┘ └─────┬─────┘
              │      │           │
              │      └─────┬─────┘
              │            ▼
              │       ┌──────────┐
              │       │ Tracking │
              │       │  Active  │
              │       └────┬─────┘
              │            │ Closure
              │            ▼
              │       ┌──────────┐
              │       │  Record  │
              │       │ Archived │
              │       └──────────┘
              │
              ▼
         ┌──────────┐
         │   Logout  │
         └──────────┘
```

### 3.2 AI-Driven Follow-up Loop (Technical State Machine)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI Follow-up Engine States                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │   LISTENING  │───▶│  EVALUATING │───▶│  DECIDING   │           │
│  │             │    │             │    │             │            │
│  │ Subscribes  │    │ Applies     │    │ Selects     │            │
│  │ to events:  │    │ RuleSet     │    │ template &  │            │
│  │ - Assessment│    │ + ML score  │    │ channel     │            │
│  │ - Tracking  │    │             │    │             │            │
│  │ - Deadline  │    │             │    │             │            │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘            │
│         │                  │                  │                   │
│         │                  │                  │                   │
│         ▼                  │                  ▼                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │  WAITING    │    │  ESCALATED  │    │ SCHEDULED   │           │
│  │             │    │             │    │             │            │
│  │ Pending     │    │ Critical    │    │ Notification │            │
│  │ user action │    │ threshold   │    │ queued      │            │
│  │             │    │ breached    │    │             │            │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘            │
│         │                  │                  │                   │
│         │                  │                  │                   │
│         └──────────────────┼──────────────────┘                   │
│                            │                                      │
│                            ▼                                      │
│                   ┌─────────────┐                                 │
│                   │  RESOLVED   │                                 │
│                   │             │                                 │
│                   │ User acted  │                                 │
│                   │ or deadline │                                 │
│                   │ passed      │                                 │
│                   └──────┬──────┘                                 │
│                          │                                        │
│                          ▼                                        │
│                   ┌─────────────┐                                 │
│                   │   CLOSED    │                                 │
│                   │             │                                 │
│                   │ Logged to   │                                 │
│                   │ Records     │                                 │
│                   └─────────────┘                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 Step-by-Step Technical Workflow: Inspection → AI Notification → Completion

#### Phase 1: Inspection Data Ingestion
1. Inspector completes field checklist via mobile app
2. GPS-tagged photos uploaded to cloud storage
3. System creates `InspectionCompletedEvent`:
   ```json
   {
     "inspectionId": "INS-2026-001",
     "requestId": "REQ-789",
     "inspectorId": "USR-456",
     "location": { "lat": 14.5995, "lng": 120.9842 },
     "timestamp": "2026-08-27T10:30:00Z",
     "checklist": { ... },
     "photos": ["s3://bucket/photo1.jpg", ...]
   }
   ```
4. Event published to message broker (e.g., AWS SNS / Redis Pub/Sub)

#### Phase 2: Assessment Processing
5. Assessment microservice consumes `InspectionCompletedEvent`
6. Weighted scoring algorithm executes:
   - Health Risk Score (40%): based on violations severity
   - Sanitation Score (35%): based on cleanliness metrics
   - Documentation Score (25%): based on paperwork completeness
7. Result stored in `Assessment` table:
   ```sql
   INSERT INTO assessments (request_id, score, certified, violations, assessed_at)
   VALUES ('REQ-789', 72.5, FALSE, '{"critical": 1, "major": 2, "minor": 3}', NOW())
   ```
8. `AssessmentCompletedEvent` published:
   ```json
   {
     "requestId": "REQ-789",
     "score": 72.5,
     "certified": false,
     "violations": { "critical": 1, "major": 2, "minor": 3 },
     "userId": "USR-123",
     "timestamp": "2026-08-27T10:35:00Z"
   }
   ```

#### Phase 3: AI Follow-up Evaluation
9. AI Follow-up Engine receives `AssessmentCompletedEvent`
10. Rule evaluation pipeline:
    ```typescript
    const rules = [
      {
        id: 'R001',
        condition: (event) => !event.certified && event.violations.critical > 0,
        action: 'IMMEDIATE_ESCALATION',
        template: 'critical-violation',
        channel: ['sms', 'email']
      },
      {
        id: 'R002',
        condition: (event) => event.certified && event.score < 80,
        action: 'CONDITIONAL_APPROVAL',
        template: 'conditional-compliance',
        channel: ['in-app']
      },
      {
        id: 'R003',
        condition: (event) => true, // default
        action: 'SCHEDULE_FOLLOWUP',
        delay: '7d',
        template: 'standard-followup'
      }
    ]
    ```
11. ML scoring layer adds contextual priority:
    - User history (repeat offender?)
    - Location risk (high-density area?)
    - Time sensitivity (public event upcoming?)
12. Decision: `IMMEDIATE_ESCALATION` triggered

#### Phase 4: Notification Delivery
13. `ReminderScheduledEvent` created:
    ```json
    {
      "reminderId": "REM-001",
      "userId": "USR-123",
      "template": "critical-violation",
      "channel": ["sms", "email"],
      "scheduledAt": "2026-08-27T10:35:05Z",
      "priority": "critical",
      "payload": {
        "requestId": "REQ-789",
        "deadline": "2026-09-03T10:35:00Z",
        "violations": ["Structural hazard", "Waste disposal"]
      }
    }
    ```
14. Notification Module queues message
15. SMS sent via Twilio / Email via SES
16. Delivery status logged: `NotificationDeliveredEvent`

#### Phase 5: User Action & Closure
17. User receives notification, logs in
18. System shows: *"Critical violations require corrective action within 7 days"*
19. User uploads corrective action documents
20. User submits for re-assessment
21. New `AssessmentCompletedEvent` generated with `certified: true`
22. AI Follow-up Engine evaluates:
    - Condition: `certified === true`
    - Action: `CLOSE_LOOP`
    - Update reminder status: `RESOLVED`
23. Certificate issued, tracking status → `Completed`
24. Entire transaction appended to Records module as immutable ledger entry

---

## 4. UI/UX Recommendations

### 4.1 Logged-In Dashboard Layout

The dashboard should follow a **"Real-Time First, Historical Second"** information hierarchy:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Navbar: Logo | Home | Services | Dashboard | Notifications | User │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  GREETING + AI SUMMARY BANNER                                │   │
│  │  "Hello, Juan. You have 2 pending actions and 1 upcoming    │   │
│  │   inspection." [AI-generated contextual summary]             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐     │
│  │  QUICK ACTIONS          │  │  REAL-TIME STATUS CARDS      │     │
│  │  ─────────────────      │  │  ────────────────────────    │     │
│  │  [+ New Application]    │  │  ┌─────┐ ┌─────┐ ┌─────┐  │     │
│  │  [Schedule Inspection]  │  │  │ REQ │ │ INS │ │ ASM │  │     │
│  │  [Upload Documents]     │  │  │ #789│ │ #45 │ │ #12 │  │     │
│  │  [View Certificates]    │  │  │Pending│ │Sched│ │Review│  │     │
│  │  [Contact Support]      │  │  └─────┘ └─────┘ └─────┘  │     │
│  └─────────────────────────┘  └─────────────────────────────┘     │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  AI REMINDERS & NOTIFICATIONS (Priority Queue)               │   │
│  │  ─────────────────────────────────────────────────────────  │   │
│  │  🔴 [CRITICAL] Corrective action required by Sep 3          │   │
│  │     REQ-789 | 2 violations | [Take Action]                  │   │
│  │  🟡 [WARNING] Inspection scheduled for Aug 30               │   │
│  │     INS-045 | 2 days remaining | [View Details]             │   │
│  │  🔵 [INFO] Certificate ready for download                    │   │
│  │     ASM-012 | Approved | [Download]                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────┐  ┌──────────────────────────┐    │
│  │  TIMELINE / ACTIVITY FEED    │  │  ANALYTICS SNAPSHOT      │    │
│  │  ─────────────────────────   │  │  ─────────────────────   │    │
│  │  • Today: Assessment done   │  │  Total: 12 requests      │    │
│  │  • Yesterday: Inspection    │  │  Approved: 8 (67%)       │    │
│  │  • Aug 25: Application      │  │  Pending: 3 (25%)        │    │
│  │    submitted                 │  │  Rejected: 1 (8%)        │    │
│  │  • Aug 20: Certificate      │  │  Avg. processing: 4.2d   │    │
│  │    downloaded                │  │                          │    │
│  └─────────────────────────────┘  └──────────────────────────┘    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  HISTORICAL RECORDS (Collapsible / Scrollable)               │   │
│  │  ─────────────────────────────────────────────────────────  │   │
│  │  [Search bar] [Filter by date] [Export CSV]                  │   │
│  │  ┌──────┬──────┬──────┬──────┬──────┐                       │   │
│  │  │ ID   │Date  │Type  │Status│Action│                       │   │
│  │  ├──────┼──────┼──────┼──────┼──────┤                       │   │
│  │  │REQ-78│08/25 │Health│Done  │View  │                       │   │
│  │  │REQ-77│08/20 │Sanit │Review│View  │                       │   │
│  │  │REQ-76│08/15 │Health│Done  │View  │                       │   │
│  │  └──────┴──────┴──────┴──────┴──────┘                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Layout Principles

| Priority | Section | Rationale |
|----------|---------|-----------|
| P0 | AI Summary Banner | Immediate awareness of actions needed |
| P0 | Quick Actions | Reduces navigation friction for common tasks |
| P0 | Real-Time Status Cards | At-a-glance view of active processes |
| P1 | AI Notifications | Contextual, time-sensitive AI-driven nudges |
| P1 | Activity Timeline | Recent history for situational awareness |
| P2 | Analytics Snapshot | Aggregate metrics for power users |
| P3 | Historical Records | Detailed archive, not needed for daily work |

### 4.3 Interaction Design Notes
- **Status cards** are clickable and expand to show timeline detail
- **AI notifications** can be dismissed or snoozed; dismissed items go to "Archive"
- **Real-time updates** via WebSocket or polling every 30 seconds
- **Empty states** show onboarding tips and quick-start guides

---

## 5. AI Logic Definition

### 5.1 AI Follow-up Reminder: Triggers & Parameters

#### 5.1.1 Trigger Taxonomy

| Trigger ID | Name | Type | Parameters | Condition |
|------------|------|------|------------|-----------|
| `T001` | Critical Violation | Event-based | `violations.critical`, `deadlineDays` | `certified === false && violations.critical > 0` |
| `T002` | Non-Compliance Score | Event-based | `score`, `threshold` | `certified === false && score < 60` |
| `T003` | Conditional Approval | Event-based | `score`, `conditions` | `certified === true && score < 80` |
| `T004` | Inspection Reminder | Date-based | `inspectionDate`, `daysBefore` | `NOW() >= inspectionDate - daysBefore` |
| `T005` | Deadline Approaching | Date-based | `deadline`, `warningDays` | `NOW() >= deadline - warningDays` |
| `T006` | Follow-up Overdue | Date-based | `lastFollowup`, `maxDays` | `NOW() > lastFollowup + maxDays` |
| `T007` | Document Expiry | Date-based | `expiryDate`, `notifyBefore` | `NOW() >= expiryDate - notifyBefore` |
| `T008` | Repeat Offender | Pattern-based | `history.violationCount`, `windowDays` | `violationCount > 3 IN last 90 days` |
| `T009` | Re-inspection Due | Event-based | `lastInspectionDate`, `intervalDays` | `NOW() > lastInspectionDate + intervalDays` |
| `T010` | User Inactivity | Behavior-based | `lastLogin`, `inactivityDays` | `NOW() > lastLogin + inactivityDays` |

#### 5.1.2 Rule Engine Configuration

```yaml
ai_followup_rules:
  global_settings:
    maxNotificationsPerDay: 3
    quietHours: { start: "22:00", end: "08:00" }
    respectUserPreferences: true
    escalationChain: [in_app, email, sms, phone]

  rules:
    - id: R001
      name: Critical Violation Immediate Escalation
      trigger: T001
      priority: critical
      channels: [sms, email]
      template: critical-violation
      cooldown: 4h
      escalation:
        - after: 24h
          channel: phone
        - after: 48h
          action: create_support_ticket

    - id: R002
      name: Low Score Follow-up
      trigger: T002
      priority: high
      channels: [in_app, email]
      template: low-score-guidance
      cooldown: 7d

    - id: R003
      name: Conditional Approval Guidance
      trigger: T003
      priority: medium
      channels: [in_app]
      template: conditional-approval-info
      cooldown: 14d

    - id: R004
      name: Upcoming Inspection
      trigger: T004
      priority: medium
      channels: [in_app, email]
      template: inspection-reminder
      cooldown: 1d

    - id: R005
      name: Deadline Warning
      trigger: T005
      priority: high
      channels: [in_app, email, sms]
      template: deadline-warning
      cooldown: 1d

    - id: R006
      name: Repeat Offender Alert
      trigger: T008
      priority: high
      channels: [in_app, email]
      template: repeat-offender-notice
      cooldown: 30d
      requiresManualReview: true
```

#### 5.1.3 ML Scoring Parameters

The AI engine uses a lightweight scoring model to prioritize notifications:

```
Priority Score = (Base Priority × Weight) 
               + (User History Factor) 
               + (Contextual Urgency) 
               - (User Preference Penalty)

Where:
- Base Priority: critical=100, high=75, medium=50, low=25
- User History Factor: repeat offender +20, first-time user -10
- Contextual Urgency: public health risk +30, seasonal +10
- User Preference Penalty: muted category -50, quiet hours -100 (defer)
```

#### 5.1.4 Data Retention & Privacy
- AI training data: anonymized, retained for 90 days
- Personal notification history: retained per Records policy (7 years)
- User preferences: retained indefinitely until account deletion
- All AI decisions logged for audit trail

---

## 6. Technical Stack Recommendations

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React 18 + TypeScript + Vite | Already in use, type-safe |
| Styling | Tailwind CSS v4 | Utility-first, consistent design system |
| State Management | React Context + Zustand | Lightweight, sufficient for auth + UI state |
| Routing | React Router v6 | Standard, supports guards |
| Backend API | Node.js / Express or Next.js API Routes | JSON over REST, easy to scale |
| Database | PostgreSQL | Relational integrity for transactions + records |
| Cache / Session | Redis | Session store, rate limiting, pub/sub for events |
| File Storage | S3-compatible (MinIO / AWS S3) | Photos, documents, certificates |
| Message Broker | Redis Pub/Sub or AWS SNS | Event-driven architecture |
| AI Engine | Node.js microservice + rule engine (JSON Rules) | Lightweight, no heavy ML infra needed initially |
| Notifications | Twilio (SMS) + AWS SES (Email) + Firebase (Push) | Reliable, scalable |
| Authentication | JWT + OAuth2 (SSO ready) | Secure, stateless |

---

## 7. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)
- [ ] Finalize database schema (users, requests, inspections, assessments, records)
- [ ] Implement AuthContext + AuthGuard in frontend
- [ ] Build Application + Profile modules
- [ ] Set up message broker and event schemas

### Phase 2: Core Workflow (Weeks 4-7)
- [ ] Inspection module (scheduling + mobile data capture)
- [ ] Assessment module (scoring engine + certificate generation)
- [ ] Tracking module (timeline + status updates)
- [ ] Records module (immutable audit trail)

### Phase 3: AI & Notifications (Weeks 8-10)
- [ ] AI Follow-up rule engine
- [ ] Notification module (multi-channel)
- [ ] Dashboard AI summary banner
- [ ] User preference management

### Phase 4: Polish (Weeks 11-12)
- [ ] Dashboard analytics
- [ ] Export/reporting features
- [ ] Performance optimization
- [ ] Security audit

---

## 8. Open Questions & Decisions Needed

1. **Authentication**: Mock login vs. real SSO (LDAP / OAuth2)?
2. **Mobile Strategy**: PWA vs. native app for inspectors?
3. **AI Complexity**: Start with rule-based only, or include predictive ML?
4. **Offline Support**: Required for field inspections in low-connectivity areas?
5. **Data residency**: All data in PH-based servers for compliance?

---

*Document prepared by System Architecture / Product Design*  
*Next review: After stakeholder approval*
