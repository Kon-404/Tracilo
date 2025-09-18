# Tracilo Source Tree Structure

*Version 1.0 - Project Organization*
*Generated: September 18, 2025*

## Monorepo Structure Overview

Tracilo uses a monorepo structure to share TypeScript types and utilities across the mobile app, web dashboard, and backend services.

```
tracilo/
├── 📁 packages/
│   ├── 📁 mobile/              # React Native mobile app
│   ├── 📁 web/                 # React web dashboard
│   ├── 📁 server/              # Node.js backend API
│   └── 📁 shared/              # Shared types and utilities
├── 📁 docs/                    # Project documentation
├── 📁 research/                # Research and planning documents
├── 📁 .bmad-core/              # BMAD development framework
├── 📁 .claude/                 # Claude Code configuration
├── 📄 package.json             # Workspace configuration
├── 📄 tsconfig.json            # Root TypeScript config
├── 📄 .eslintrc.js             # Root ESLint config
├── 📄 .prettierrc              # Code formatting config
└── 📄 README.md                # Project overview
```

## Package Structure Details

### Mobile App (`packages/mobile/`)

```
packages/mobile/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 forms/          # Form-specific components
│   │   ├── 📁 common/         # Generic UI components
│   │   └── 📁 compliance/     # Compliance-specific components
│   ├── 📁 screens/            # Screen-level components
│   │   ├── 📁 auth/          # Authentication screens
│   │   ├── 📁 projects/      # Project management screens
│   │   ├── 📁 compliance/    # Compliance workflow screens
│   │   └── 📁 profile/       # User profile screens
│   ├── 📁 services/           # API and business logic
│   │   ├── 📁 api/           # API client and endpoints
│   │   ├── 📁 offline/       # Offline sync management
│   │   ├── 📁 storage/       # Local storage utilities
│   │   └── 📁 compliance/    # Compliance-specific services
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 📁 queries/       # React Query hooks
│   │   ├── 📁 forms/         # Form management hooks
│   │   └── 📁 device/        # Device capability hooks
│   ├── 📁 context/            # React context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   ├── OfflineContext.tsx # Offline sync state
│   │   └── ThemeContext.tsx  # Theme and styling
│   ├── 📁 utils/              # Utility functions
│   │   ├── 📁 validation/    # Input validation schemas
│   │   ├── 📁 formatting/    # Data formatting utilities
│   │   ├── 📁 permissions/   # Device permission handling
│   │   └── 📁 sync/          # Data synchronization utilities
│   ├── 📁 types/              # Mobile-specific TypeScript types
│   ├── 📁 navigation/         # Navigation configuration
│   ├── 📁 assets/             # Images, fonts, icons
│   └── 📄 App.tsx             # Root application component
├── 📁 android/                # Android-specific native code
├── 📁 ios/                    # iOS-specific native code
├── 📁 __tests__/              # Test files
├── 📄 package.json            # Mobile app dependencies
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 metro.config.js         # Metro bundler configuration
├── 📄 react-native.config.js  # React Native configuration
└── 📄 .env.example            # Environment variables template
```

### Web Dashboard (`packages/web/`)

```
packages/web/
├── 📁 src/
│   ├── 📁 components/          # Reusable React components
│   │   ├── 📁 forms/          # Form components
│   │   ├── 📁 tables/         # Data table components
│   │   ├── 📁 charts/         # Analytics chart components
│   │   ├── 📁 layout/         # Layout components
│   │   └── 📁 compliance/     # Compliance-specific components
│   ├── 📁 pages/              # Page-level components
│   │   ├── 📁 auth/          # Authentication pages
│   │   ├── 📁 dashboard/     # Main dashboard pages
│   │   ├── 📁 projects/      # Project management pages
│   │   ├── 📁 reports/       # Reporting and analytics pages
│   │   ├── 📁 settings/      # Settings and configuration
│   │   └── 📁 users/         # User management pages
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 📁 api/           # API query hooks
│   │   ├── 📁 forms/         # Form management hooks
│   │   └── 📁 auth/          # Authentication hooks
│   ├── 📁 services/           # API services and business logic
│   │   ├── 📁 api/           # API client configuration
│   │   ├── 📁 auth/          # Authentication services
│   │   └── 📁 reports/       # Report generation services
│   ├── 📁 utils/              # Utility functions
│   │   ├── 📁 formatting/    # Data formatting
│   │   ├── 📁 validation/    # Form validation schemas
│   │   └── 📁 constants/     # Application constants
│   ├── 📁 types/              # Web-specific TypeScript types
│   ├── 📁 styles/             # CSS and styling
│   ├── 📁 assets/             # Static assets
│   └── 📄 main.tsx            # Application entry point
├── 📁 public/                 # Static public assets
├── 📁 __tests__/              # Test files
├── 📄 package.json            # Web app dependencies
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 vite.config.ts          # Vite build configuration
├── 📄 index.html              # HTML template
└── 📄 .env.example            # Environment variables template
```

### Backend Server (`packages/server/`)

```
packages/server/
├── 📁 src/
│   ├── 📁 controllers/         # HTTP request handlers
│   │   ├── 📁 auth/           # Authentication endpoints
│   │   ├── 📁 projects/       # Project management endpoints
│   │   ├── 📁 compliance/     # Compliance workflow endpoints
│   │   ├── 📁 users/          # User management endpoints
│   │   ├── 📁 files/          # File upload/download endpoints
│   │   └── 📁 reports/        # Reporting endpoints
│   ├── 📁 services/           # Business logic layer
│   │   ├── 📁 auth/           # Authentication services
│   │   ├── 📁 compliance/     # Compliance processing services
│   │   ├── 📁 sync/           # Data synchronization services
│   │   ├── 📁 notifications/  # Notification services
│   │   └── 📁 integrations/   # Third-party integrations
│   ├── 📁 models/             # Database models (Prisma)
│   ├── 📁 middleware/         # Express middleware
│   │   ├── auth.middleware.ts # Authentication middleware
│   │   ├── validation.middleware.ts # Request validation
│   │   ├── error.middleware.ts # Error handling
│   │   └── rate-limit.middleware.ts # Rate limiting
│   ├── 📁 routes/             # API route definitions
│   │   ├── 📄 index.ts        # Route aggregation
│   │   ├── 📄 auth.routes.ts  # Authentication routes
│   │   ├── 📄 projects.routes.ts # Project routes
│   │   ├── 📄 compliance.routes.ts # Compliance routes
│   │   └── 📄 users.routes.ts # User management routes
│   ├── 📁 utils/              # Utility functions
│   │   ├── 📁 validation/     # Input validation schemas
│   │   ├── 📁 encryption/     # Encryption utilities
│   │   ├── 📁 pdf/            # PDF generation utilities
│   │   └── 📁 integrations/   # Integration helpers
│   ├── 📁 config/             # Configuration files
│   │   ├── 📄 database.ts     # Database configuration
│   │   ├── 📄 redis.ts        # Redis configuration
│   │   └── 📄 app.ts          # Application configuration
│   ├── 📁 types/              # Server-specific TypeScript types
│   └── 📄 server.ts           # Application entry point
├── 📁 prisma/                 # Database schema and migrations
│   ├── 📄 schema.prisma       # Database schema definition
│   ├── 📁 migrations/         # Database migration files
│   └── 📄 seed.ts             # Database seeding script
├── 📁 __tests__/              # Test files
│   ├── 📁 integration/        # Integration tests
│   ├── 📁 unit/               # Unit tests
│   └── 📁 fixtures/           # Test data fixtures
├── 📁 docs/                   # API documentation
├── 📄 package.json            # Server dependencies
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 .env.example            # Environment variables template
└── 📄 Dockerfile              # Container configuration
```

### Shared Package (`packages/shared/`)

```
packages/shared/
├── 📁 src/
│   ├── 📁 types/              # Shared TypeScript interfaces
│   │   ├── 📄 auth.types.ts   # Authentication types
│   │   ├── 📄 user.types.ts   # User-related types
│   │   ├── 📄 project.types.ts # Project types
│   │   ├── 📄 compliance.types.ts # Compliance types
│   │   ├── 📄 file.types.ts   # File handling types
│   │   └── 📄 api.types.ts    # API request/response types
│   ├── 📁 constants/          # Shared application constants
│   │   ├── 📄 compliance.constants.ts # Compliance standards
│   │   ├── 📄 api.constants.ts # API endpoints and codes
│   │   └── 📄 validation.constants.ts # Validation rules
│   ├── 📁 validators/         # Shared validation schemas
│   │   ├── 📄 auth.validators.ts # Authentication validation
│   │   ├── 📄 project.validators.ts # Project validation
│   │   └── 📄 compliance.validators.ts # Compliance validation
│   ├── 📁 utils/              # Shared utility functions
│   │   ├── 📄 date.utils.ts   # Date formatting utilities
│   │   ├── 📄 validation.utils.ts # Validation helpers
│   │   └── 📄 formatting.utils.ts # Data formatting
│   └── 📄 index.ts            # Package exports
├── 📄 package.json            # Shared package dependencies
└── 📄 tsconfig.json           # TypeScript configuration
```

## Documentation Structure (`docs/`)

```
docs/
├── 📁 prd/                    # Product Requirements (sharded)
├── 📁 architecture/           # Architecture documentation
│   ├── 📄 coding-standards.md # Development standards
│   ├── 📄 tech-stack.md       # Technology specifications
│   └── 📄 source-tree.md      # This document
├── 📁 stories/                # User stories and features
├── 📁 api/                    # API documentation
├── 📄 prd.md                  # Main PRD document
├── 📄 architecture.md         # Main architecture document
└── 📄 technical-roadmap.md    # Development roadmap
```

## Key File Conventions

### Import/Export Patterns

```typescript
// Shared types import
import { User, Project, ComplianceForm } from '@tracilo/shared';

// Internal imports (alphabetical)
import { AuthService } from '../services/auth.service';
import { ValidationUtils } from '../utils/validation.utils';

// Relative imports
import './Component.styles.css';
```

### Environment Configuration

```bash
# Development
packages/mobile/.env.development
packages/web/.env.development
packages/server/.env.development

# Production
packages/mobile/.env.production
packages/web/.env.production
packages/server/.env.production
```

### Test Organization

```
__tests__/
├── 📁 unit/                   # Unit tests
├── 📁 integration/            # Integration tests
├── 📁 e2e/                    # End-to-end tests
├── 📁 fixtures/               # Test data
├── 📁 mocks/                  # Mock implementations
└── 📄 setup.ts                # Test configuration
```

## Development Workspace

### Package.json Scripts Structure

```json
{
  "scripts": {
    "dev:mobile": "cd packages/mobile && npm run start",
    "dev:web": "cd packages/web && npm run dev",
    "dev:server": "cd packages/server && npm run dev",
    "build:all": "npm run build --workspaces",
    "test:all": "npm run test --workspaces",
    "lint:all": "npm run lint --workspaces"
  },
  "workspaces": [
    "packages/mobile",
    "packages/web",
    "packages/server",
    "packages/shared"
  ]
}
```

### Git Ignore Structure

```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Production builds
/packages/web/dist/
/packages/server/dist/
/packages/mobile/android/app/build/
/packages/mobile/ios/build/

# Environment files
.env
.env.local
.env.production

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
```

This structure ensures clear separation of concerns while enabling code sharing and consistent development practices across the entire Tracilo platform.