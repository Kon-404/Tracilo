# Technical Assumptions

## Repository Structure: Monorepo
**Turborepo-based monorepo** with apps/ (mobile, web, api) and packages/ (shared, ui, config) organization to enable shared TypeScript types and consistent tooling across all components.

## Service Architecture
**Monolithic backend initially** with Node.js + Express + tRPC, designed with microservices migration path. This supports rapid MVP development while maintaining scalability for future growth to support 1000+ concurrent users per organization.

## Testing Requirements
**Full Testing Pyramid** approach with Jest + Detox + Supertest covering:
- Unit tests for business logic
- Integration tests for API endpoints and database operations
- End-to-end mobile testing for critical compliance workflows
- Manual testing convenience methods for field validation

## Additional Technical Assumptions and Requests

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
