# Tracilo Coding Standards

*Version 1.0 - Development Guidelines*
*Generated: September 18, 2025*

## Code Style & Formatting

### TypeScript Configuration
- **Strict mode**: Always enabled across all projects
- **ESLint**: Airbnb TypeScript configuration with custom rules
- **Prettier**: 2-space indentation, single quotes, trailing commas
- **Import ordering**: External → Internal → Relative imports with blank lines

### File Naming Conventions
```
# Components (PascalCase)
UserProfile.tsx
ComplianceForm.tsx

# Utilities/Services (camelCase)
userService.ts
validationUtils.ts

# Constants (UPPER_SNAKE_CASE)
API_ENDPOINTS.ts
COMPLIANCE_TYPES.ts

# Directories (kebab-case)
user-management/
compliance-forms/
```

### Code Organization

#### React Native Mobile App
```
src/
├── components/          # Reusable UI components
├── screens/            # Screen-level components
├── services/           # API and business logic
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── context/            # React context providers
└── assets/             # Images, fonts, etc.
```

#### Node.js Backend
```
src/
├── controllers/        # Route handlers
├── services/          # Business logic
├── models/            # Database models
├── middleware/        # Express middleware
├── utils/             # Helper functions
├── types/             # TypeScript types
├── config/            # Configuration files
└── routes/            # API route definitions
```

#### Shared Types
```
shared/
├── types/             # Common TypeScript interfaces
├── constants/         # Shared constants
└── validators/        # Validation schemas
```

## Code Quality Standards

### Function Design
- **Single Responsibility**: Each function should do one thing well
- **Pure functions preferred**: Minimize side effects
- **Max 20 lines per function**: Break down complex logic
- **Descriptive names**: `calculateComplianceScore()` not `calc()`

### Error Handling
```typescript
// Mobile App - Always handle offline scenarios
try {
  const result = await apiCall();
  return { success: true, data: result };
} catch (error) {
  if (error.name === 'NetworkError') {
    return { success: false, error: 'OFFLINE_MODE' };
  }
  throw error;
}

// Backend - Structured error responses
throw new AppError('Validation failed', 400, {
  field: 'professionalId',
  code: 'INVALID_PIRB_NUMBER'
});
```

### Documentation Requirements
- **JSDoc for all public functions**
- **README.md in each major directory**
- **API endpoints documented with OpenAPI/Swagger**
- **Inline comments for complex business logic only**

### Testing Standards
- **Unit tests**: 80%+ coverage for services and utilities
- **Integration tests**: All API endpoints
- **E2E tests**: Critical user workflows (COC generation, offline sync)
- **Test file naming**: `*.test.ts` or `*.spec.ts`

## Performance Standards

### Mobile App
- **Bundle size**: < 50MB total app size
- **Startup time**: < 3 seconds on mid-range devices
- **Memory usage**: < 100MB during normal operation
- **Offline storage**: SQLite with migration strategy

### Backend
- **Response times**: < 200ms for simple queries, < 2s for complex operations
- **Database queries**: Use indexes, avoid N+1 problems
- **Caching**: Redis for frequently accessed data
- **File uploads**: Stream processing for large files

## Security Standards

### Data Protection
- **Sensitive data encryption**: AES-256 for PII
- **Database**: Column-level encryption for compliance data
- **File storage**: Encrypted at rest and in transit
- **Audit logging**: All data access and modifications

### Authentication & Authorization
- **JWT tokens**: Short-lived access tokens (15 min) + refresh tokens
- **Role-based access**: Technician, Admin, Super Admin levels
- **Multi-factor authentication**: Required for admin accounts
- **Session management**: Secure token storage and rotation

### API Security
- **Rate limiting**: 100 requests/minute per user
- **Input validation**: Joi schemas for all endpoints
- **CORS**: Restricted origins in production
- **HTTPS only**: SSL/TLS 1.3 minimum

## South African Compliance Specific

### Professional Verification
```typescript
// Always verify current registration status
interface ProfessionalVerification {
  pirbNumber: string;
  verificationDate: Date;
  expiryDate: Date;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
}
```

### COC Generation Standards
- **Template validation**: Exact SANS format compliance
- **Digital signatures**: ECTA-compliant implementation
- **Audit trail**: Complete history of all document changes
- **Backup generation**: PDF + structured data storage

### Data Retention
- **Compliance records**: 7 years minimum retention
- **Audit logs**: 3 years minimum retention
- **Photo evidence**: Original resolution + compressed versions
- **Backup strategy**: 3-2-1 rule (3 copies, 2 different media, 1 offsite)

## Git Workflow

### Branch Naming
```
feature/user-authentication
bugfix/offline-sync-issue
hotfix/security-patch
release/v1.2.0
```

### Commit Messages
```
feat: add PIRB professional verification API
fix: resolve offline sync conflict resolution
docs: update API documentation for COC endpoints
test: add integration tests for compliance forms
refactor: optimize database queries for reporting
```

### Code Review Requirements
- **All code must be reviewed** before merging to main
- **Security review required** for authentication/authorization changes
- **Performance testing** for database and API changes
- **Compliance review** for COC generation features

## Development Environment

### Required Tools
- **Node.js**: v18+ LTS
- **React Native CLI**: Latest stable
- **PostgreSQL**: v14+
- **Redis**: v6+
- **Docker**: For local development environment

### IDE Configuration
- **VS Code recommended** with extensions:
  - TypeScript and JavaScript Language Features
  - ESLint
  - Prettier
  - React Native Tools
  - PostgreSQL extension

### Pre-commit Hooks
- **Lint check**: ESLint + Prettier
- **Type check**: TypeScript compiler
- **Test run**: Unit tests
- **Security scan**: Basic vulnerability check