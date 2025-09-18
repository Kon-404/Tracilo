# Tracilo Technology Stack

*Version 1.0 - Complete Technology Specifications*
*Generated: September 18, 2025*

## Technology Stack Overview

**Tracilo** uses a modern fullstack architecture optimized for offline-first mobile operations with comprehensive web administration capabilities.

## Frontend Technologies

### Mobile Application (React Native)
- **Framework**: React Native 0.72+ (Hermes engine enabled)
- **Language**: TypeScript 5.0+
- **State Management**: Zustand for global state, React Query for server state
- **Navigation**: React Navigation 6.x
- **Forms**: React Hook Form with Zod validation
- **UI Components**: React Native Paper (Material Design)
- **Storage**: React Native MMKV for key-value + SQLite for relational data
- **Networking**: Axios with offline interceptors
- **Camera**: React Native Vision Camera
- **Maps**: React Native Maps (Google Maps)
- **Geolocation**: React Native Geolocation Service
- **Signatures**: React Native Signature Canvas
- **Push Notifications**: React Native Push Notification

### Web Dashboard (React)
- **Framework**: React 18 with Vite build tool
- **Language**: TypeScript 5.0+
- **State Management**: Zustand + React Query
- **Routing**: React Router DOM v6
- **UI Library**: Mantine 7.x (comprehensive component library)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for analytics dashboards
- **Maps**: Google Maps React for location visualization
- **File Upload**: React Dropzone
- **Date Handling**: Day.js
- **Authentication**: JWT tokens with auto-refresh

## Backend Technologies

### Server Framework
- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js 4.x with TypeScript
- **Process Manager**: PM2 for production
- **API Documentation**: Swagger/OpenAPI 3.0

### Database Layer
- **Primary Database**: PostgreSQL 14+
- **ORM**: Prisma 5.x for type-safe database access
- **Migrations**: Prisma migrate
- **Connection Pooling**: PgBouncer in production
- **Cache**: Redis 6+ for session management and caching
- **Search**: PostgreSQL full-text search with tsvector

### Authentication & Security
- **JWT Tokens**: jsonwebtoken library
- **Password Hashing**: bcrypt
- **Rate Limiting**: express-rate-limit
- **CORS**: cors middleware
- **Helmet**: Security headers
- **Input Validation**: Joi schemas
- **File Upload**: Multer with virus scanning

## Storage & File Management

### File Storage
- **Local Development**: Local filesystem
- **Production**: AWS S3 or Azure Blob Storage
- **CDN**: CloudFront for global file delivery
- **Image Processing**: Sharp for optimization and resizing
- **Document Generation**: Puppeteer for PDF COCs

### Database Storage
- **User Data**: PostgreSQL with row-level security
- **File Metadata**: PostgreSQL with JSONB columns
- **Audit Logs**: PostgreSQL with partitioning
- **Offline Sync**: Custom conflict resolution tables

## Development Tools

### Code Quality
- **Linting**: ESLint with Airbnb TypeScript config
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Husky + lint-staged
- **Commit Messages**: Conventional Commits

### Testing Framework
- **Unit Testing**: Jest + React Native Testing Library
- **E2E Testing**: Detox for mobile, Playwright for web
- **API Testing**: Supertest
- **Coverage**: Jest coverage reports
- **Mocking**: MSW (Mock Service Worker)

### Build & Deployment
- **Mobile Builds**: React Native CLI + Flipper for debugging
- **Web Builds**: Vite with production optimization
- **Code Bundling**: Metro (RN) and Vite (Web)
- **Environment Variables**: dotenv with validation
- **Docker**: Containerized backend services

## Infrastructure & DevOps

### Development Environment
- **Package Manager**: npm (workspace monorepo)
- **Node Version**: nvm for version management
- **Database**: Docker Compose for local PostgreSQL + Redis
- **API Mocking**: MSW for offline development

### Production Infrastructure
- **Application Hosting**: AWS EC2 or Azure VMs
- **Database**: Managed PostgreSQL (AWS RDS/Azure Database)
- **Cache**: Managed Redis (AWS ElastiCache/Azure Cache)
- **Load Balancer**: NGINX with SSL termination
- **SSL Certificates**: Let's Encrypt with auto-renewal
- **Monitoring**: DataDog or New Relic
- **Logging**: Winston with log aggregation
- **Backup**: Automated daily database backups

### CI/CD Pipeline
- **Version Control**: Git with GitHub/GitLab
- **CI/CD**: GitHub Actions or GitLab CI
- **Code Quality**: SonarQube integration
- **Security Scanning**: Snyk for dependency vulnerabilities
- **Deployment**: Blue-green deployment strategy

## South African Compliance Integration

### Regulatory APIs
- **PIRB Integration**: Custom REST API wrapper
- **SAQCC Gas**: SOAP API with xml2js parsing
- **Department of Labour**: Custom integration
- **ECTA Signatures**: Digital signature validation

### Compliance Libraries
- **PDF Generation**: Puppeteer for exact SANS format
- **Digital Signatures**: node-forge for certificate handling
- **Encryption**: crypto-js for AES-256 encryption
- **Audit Logging**: Winston with structured logging

## Performance & Monitoring

### Performance Tools
- **Bundle Analysis**: Bundle analyzer for both platforms
- **Performance Monitoring**: React Native Performance Monitor
- **Memory Profiling**: Flipper memory inspector
- **Network Monitoring**: Custom offline-first sync metrics

### Monitoring & Analytics
- **Application Monitoring**: Sentry for error tracking
- **Performance Metrics**: Custom dashboards
- **User Analytics**: Privacy-focused analytics
- **Health Checks**: Express health check endpoints

## Development Dependencies

### Shared Dependencies
```json
{
  "typescript": "^5.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0",
  "jest": "^29.0.0",
  "husky": "^8.0.0",
  "lint-staged": "^13.0.0"
}
```

### Mobile-Specific Dependencies
```json
{
  "react-native": "^0.72.0",
  "react-navigation": "^6.0.0",
  "react-native-paper": "^5.0.0",
  "react-native-mmkv": "^2.0.0",
  "react-query": "^4.0.0"
}
```

### Backend-Specific Dependencies
```json
{
  "express": "^4.18.0",
  "prisma": "^5.0.0",
  "@prisma/client": "^5.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcrypt": "^5.1.0",
  "joi": "^17.9.0"
}
```

## Version Management

### Node.js Versions
- **Development**: Node.js 18.17.0 LTS
- **Production**: Node.js 18.17.0 LTS
- **Package Manager**: npm 9.x

### React Native Versions
- **React Native**: 0.72.6
- **React**: 18.2.0
- **React Native CLI**: Latest stable

### Database Versions
- **PostgreSQL**: 14.9 (minimum)
- **Redis**: 6.2 (minimum)

## Migration Strategy

### From Development to Production
1. **Database migrations**: Prisma migrate deploy
2. **Environment variables**: Secure environment management
3. **File uploads**: Migration to cloud storage
4. **SSL certificates**: Let's Encrypt setup
5. **Monitoring**: Full observability stack

### Scalability Considerations
- **Database sharding**: By organization/region
- **File storage**: CDN distribution
- **API scaling**: Horizontal scaling with load balancing
- **Offline sync**: Optimized conflict resolution algorithms