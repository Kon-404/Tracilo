# Tracilo Product Requirements Document (PRD)

*Generated on September 18, 2025*

## Goals and Background Context

### Goals
• Provide complete traceability and compliance with South African standards through offline-capable mobile tools and centralized administration
• Ensure every installation, callout, and inspection is properly documented and auditable with a single source of truth per site
• Reduce compliance audit failures by 80% through standardized digital documentation processes
• Achieve 95% submission completeness (photos, signatures, all required fields) for all field work
• Enable field technicians to complete full workflows offline with successful sync rates of 99%+
• Deliver sub-2 hour time-to-compliance from work completion to approved COC generation

### Background Context

Tracilo addresses the critical lack of standardization and compliance tracking in South African field operations across electrical, solar, plumbing, gas, and HVAC trades. Currently, field technicians rely on paper-based processes that result in lost documentation, incomplete compliance certificates, and no digital audit trails - creating significant regulatory risks and operational inefficiencies.

The platform combines three integrated components: an offline-first React Native mobile app for field operations, a React web dashboard for administrative management, and a Node.js backend with PostgreSQL database. This architecture specifically addresses the reality of unreliable internet connectivity in field environments while maintaining the comprehensive site-centric documentation required for South African trade compliance standards.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-09-18 | 1.0 | Initial PRD creation from Project Brief | John (PM) |

## Requirements

### Functional Requirements

**FR1:** The system shall provide offline-first mobile app functionality enabling field technicians to complete all core workflows without internet connectivity

**FR2:** The system shall integrate with South African regulatory bodies (PIRB, SAQCC Gas, Department of Labour) for real-time professional credential verification

**FR3:** The system shall provide SANS-compliant digital checklist templates for electrical (SANS 10142-1:2024), solar (SANS 61215), plumbing (SANS 10252-1:2018), and gas installations (SANS 10087-1:2024)

**FR4:** The system shall capture compliance photos with automatic metadata (GPS, timestamp, device info) and organize them by project

**FR5:** The system shall collect ECTA-compliant digital signatures with professional identification embedding

**FR6:** The system shall automatically generate legally valid Certificates of Compliance (COCs) with official formatting and unique certificate numbering

**FR7:** The system shall provide multi-tenant web dashboard with secure organization separation and role-based access control

**FR8:** The system shall implement background synchronization with conflict resolution for offline work completed by multiple technicians

### Non-Functional Requirements

**NFR1:** The mobile app shall launch in under 3 seconds on mid-range Android devices (API level 26+)

**NFR2:** The system shall maintain 99.5% uptime for compliance-critical operations

**NFR3:** Professional verification shall complete within 5 seconds for cached credentials

**NFR4:** The system shall support 1000+ concurrent users per organization with horizontal scaling capability

**NFR5:** All network communications shall use TLS 1.3 encryption with mobile database using SQLCipher

**NFR6:** The system shall provide complete audit trail for all compliance-related actions meeting POPIA requirements

**NFR7:** COC generation shall complete within 10 seconds from work completion to PDF delivery

**NFR8:** The system shall achieve 95% submission completeness (photos, signatures, required fields) for field work

## User Interface Design Goals

### Overall UX Vision
A professional, field-optimized mobile experience that functions seamlessly in challenging environments (gloves, bright sunlight, poor connectivity) while maintaining the credibility and compliance rigor required for trade professional work. The interface should feel familiar to technicians transitioning from paper workflows while providing clear digital advantages.

### Key Interaction Paradigms
- **One-handed operation optimized** for field work with thumb-zone button placement
- **Offline-first interaction patterns** with clear sync status indicators and queue management
- **Progressive disclosure** to reduce cognitive load during complex compliance procedures
- **Error prevention over error correction** with validation prompts and required field enforcement
- **Professional presentation** building user confidence with clean, credible design

### Core Screens and Views
- **Login/Authentication Screen** with professional verification status
- **Job Dashboard** showing active and pending work with offline sync indicators
- **Digital Checklist Interface** with step-by-step compliance workflows
- **Photo Capture & Organization** with automatic metadata and project linking
- **Digital Signature Collection** with client information and professional identification
- **Certificate Generation & Review** with PDF preview and delivery options
- **Settings & Sync Management** for offline operation and data management

### Accessibility: WCAG AA
Meeting WCAG AA standards to ensure usability with work gloves, varying lighting conditions, and different technical skill levels among field technicians.

### Branding
Professional, trustworthy design reflecting South African trade compliance standards. Clean, high-contrast interface suitable for outdoor use with consistent iconography that translates across different trades (electrical, plumbing, gas, solar).

### Target Device and Platforms: Mobile First, Web Responsive
**Primary:** Android mobile (API 26+) optimized for mid-range devices common in South African market
**Secondary:** Web dashboard for operations managers (modern browsers)
**Future:** iOS mobile for expanded market reach

## Technical Assumptions

### Repository Structure: Monorepo
**Turborepo-based monorepo** with apps/ (mobile, web, api) and packages/ (shared, ui, config) organization to enable shared TypeScript types and consistent tooling across all components.

### Service Architecture
**Monolithic backend initially** with Node.js + Express + tRPC, designed with microservices migration path. This supports rapid MVP development while maintaining scalability for future growth to support 1000+ concurrent users per organization.

### Testing Requirements
**Full Testing Pyramid** approach with Jest + Detox + Supertest covering:
- Unit tests for business logic
- Integration tests for API endpoints and database operations
- End-to-end mobile testing for critical compliance workflows
- Manual testing convenience methods for field validation

### Additional Technical Assumptions and Requests

**Frontend Technology Stack:**
- **Mobile:** React Native + TypeScript + Zustand + NativeWind for offline-first field operations
- **Web Dashboard:** React + TypeScript + modern state management for administrative functions
- **Offline Storage:** SQLite with SQLCipher encryption for mobile compliance data persistence

**Backend & Infrastructure:**
- **API Layer:** Node.js + Express + tRPC + TypeScript for type-safe client-server communication
- **Database:** PostgreSQL + Redis for multi-tenant data with session management and caching
- **File Storage:** Vercel Blob storage (migration path to AWS S3 for scale)
- **Deployment Platform:** Vercel + Supabase for rapid deployment and database hosting

**Security & Compliance:**
- **Encryption:** TLS 1.3 for network, SQLCipher for mobile storage, encrypted blob storage for photos/certificates
- **Authentication:** JWT-based with professional verification integration and role-based access control
- **Multi-Tenancy:** Database-level tenant isolation with shared infrastructure for cost efficiency
- **Compliance:** POPIA-ready data handling with complete audit trails for regulatory requirements

**Development & Operations:**
- **Monitoring:** Sentry for error tracking and performance monitoring across mobile and web
- **CI/CD:** GitHub Actions with automated testing and deployment to staging/production
- **Development Tools:** Turborepo for monorepo management, Metro + Webpack for builds

**Professional Verification Integration:**
- **Regulatory APIs:** Integration with PIRB, SAQCC Gas, and Department of Labour for credential verification
- **Fallback Systems:** Manual verification workflows when external APIs are unavailable
- **Credential Caching:** Redis-based caching for performance with renewal monitoring systems

**Performance Constraints:**
- **Mobile Performance:** <3 second cold start, complete offline functionality, <5% battery usage per hour
- **API Performance:** <200ms response times for standard operations, <5 seconds for professional verification
- **Synchronization:** Background sync with conflict resolution, 99%+ sync success rate

## Epic List

The following epics provide a comprehensive, sequential delivery approach for Tracilo, building from foundational infrastructure to advanced competitive features. **Note:** Detailed epic specifications are available in `docs/stories/` with complete story breakdowns and acceptance criteria.

**Epic 1: Foundation & Core Infrastructure**
Establish project setup, authentication, and basic user management with complete development environment and CI/CD pipeline.

**Epic 2: Professional Verification & Compliance Infrastructure**
Enable key user journeys and business processes with South African regulatory body integration (PIRB, SAQCC Gas, Department of Labour) for credential validation.

**Epic 3: Core Business Entities & MVP Compliance Features**
Create and manage primary domain objects with CRUD operations, implementing essential offline digital checklists, compliance photos, signatures, and automated COC generation.

**Epic 4: Deployment & Production Infrastructure**
Establish production-ready infrastructure, monitoring, security, and deployment processes supporting enterprise-grade reliability and South African market compliance.

**Epic 5: Advanced Features & Market Expansion**
Implement competitive advantage features including AI-powered optimization, advanced analytics, client portal, and multi-trade template customization.

### Epic Implementation Reference

**Detailed Epic Specifications:** All epic details, story breakdowns, acceptance criteria, and technical specifications are comprehensively documented in:

- `docs/stories/epic-1-project-foundation.md` - Complete project scaffolding and development infrastructure
- `docs/stories/epic-2-professional-verification.md` - Regulatory body integration and credential verification
- `docs/stories/epic-3-core-compliance-mvp.md` - Essential compliance features and offline functionality
- `docs/stories/epic-4-deployment-production.md` - Production infrastructure and security hardening
- `docs/stories/epic-5-advanced-features.md` - Competitive features and market expansion capabilities

Individual user stories with full acceptance criteria and task breakdowns are located in:
- `docs/stories/1.1.project-scaffolding.md`
- `docs/stories/1.2.development-environment.md`
- `docs/stories/1.3.database-api-foundation.md`
- `docs/stories/1.4.testing-cicd-pipeline.md`

**Epic Sequencing Rationale:**
- **Epic 1** delivers foundational infrastructure enabling development velocity for subsequent epics
- **Epic 2** establishes critical compliance infrastructure required for legally valid COC generation
- **Epic 3** implements core MVP value proposition serving field technicians and operations managers
- **Epic 4** ensures production readiness and enterprise reliability for market launch
- **Epic 5** provides competitive differentiation and market expansion capabilities

**Cross-Epic Dependencies:**
- Professional verification (Epic 2) enables secure COC generation (Epic 3)
- Production infrastructure (Epic 4) supports reliable delivery of core features (Epic 3)
- Advanced features (Epic 5) build upon proven MVP foundation (Epic 3)

## Next Steps

### UX Expert Prompt
Please review this PRD and create detailed UX/UI specifications for the mobile-first interface, focusing on offline-first interaction patterns and field-optimized design for South African trade professionals.

### Architect Prompt
Please review this PRD and create comprehensive technical architecture documentation, focusing on offline-first mobile sync, multi-tenant security, and South African regulatory integration requirements.

---

*This PRD integrates with existing epic and story documentation in `docs/stories/` to provide complete product development guidance. All technical decisions and feature priorities align with the foundational Project Brief in `docs/brief.md`.*