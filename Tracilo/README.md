# Tracilo

**South African Electrical Compliance Management Platform**

An offline-first mobile app and web dashboard designed specifically for South African electricians and compliance professionals to streamline Certificate of Compliance (COC) generation and professional verification processes.

## 🎯 Project Overview

Tracilo addresses the unique challenges of electrical compliance in South Africa by providing:

- **Professional Verification**: Direct integration with PIRB, SAQCC Gas, and Department of Labour APIs
- **SANS Compliant Templates**: Pre-built checklists following South African National Standards
- **Offline-First Architecture**: Full functionality without internet connectivity
- **Digital COC Generation**: Automated, professional compliance certificates
- **Photo Documentation**: Comprehensive visual evidence collection
- **Sync Capabilities**: Seamless data synchronization when connected

## 🏗️ Architecture

### Monorepo Structure
```
tracilo/
├── packages/
│   ├── mobile/     # React Native mobile app
│   ├── web/        # React web dashboard
│   ├── server/     # Node.js backend API
│   └── shared/     # Shared types and utilities
├── docs/           # Project documentation
└── research/       # Research and planning
```

### Technology Stack

**Frontend**
- **Mobile**: React Native 0.72+ with TypeScript
- **Web**: React 18 + Vite with TypeScript
- **State Management**: Zustand + React Query
- **UI Components**: React Native Paper (Mobile), Mantine (Web)

**Backend**
- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 14+ with Prisma ORM
- **Cache**: Redis 6+
- **Authentication**: JWT with refresh tokens

**Development**
- **Monorepo**: npm workspaces
- **Code Quality**: ESLint + Prettier + TypeScript strict mode
- **Testing**: Jest + React Native Testing Library
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ LTS
- npm 9+
- PostgreSQL 14+
- Redis 6+
- React Native development environment (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kon-404/Tracilo.git
   cd Tracilo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp packages/server/.env.example packages/server/.env
   cp packages/web/.env.example packages/web/.env
   cp packages/mobile/.env.example packages/mobile/.env
   ```

4. **Start development servers**
   ```bash
   # Start all services
   npm run dev:all

   # Or individually
   npm run dev:server   # Backend API
   npm run dev:web      # Web dashboard
   npm run dev:mobile   # Mobile app
   ```

## 📚 Documentation

- **[Product Requirements](docs/prd.md)** - Complete feature specifications
- **[Architecture Guide](docs/architecture.md)** - Technical architecture overview
- **[Coding Standards](docs/architecture/coding-standards.md)** - Development guidelines
- **[Tech Stack](docs/architecture/tech-stack.md)** - Technology specifications
- **[User Stories](docs/stories/)** - Detailed feature requirements

## 🏃‍♂️ Development Workflow

### Epic Structure

1. **[Epic 1: Project Foundation](docs/prd/epic-1-project-foundation.md)**
   - Project scaffolding and development environment
   - Database and API foundation
   - Testing and CI/CD pipeline

2. **[Epic 2: Professional Verification](docs/prd/epic-2-professional-verification.md)**
   - PIRB, SAQCC Gas, Department of Labour integrations
   - Manual verification workflows
   - Credential renewal monitoring

3. **[Epic 3: Core Compliance MVP](docs/prd/epic-3-core-compliance-mvp.md)**
   - SANS compliant checklist templates
   - Mobile interface with offline storage
   - Photo documentation system

4. **[Epic 4: Deployment & Production](docs/prd/epic-4-deployment-production.md)**
   - Production infrastructure setup
   - Performance optimization
   - Site integration

5. **[Epic 5: Advanced Features](docs/prd/epic-5-advanced-features.md)**
   - Advanced reporting and analytics
   - Multi-tenancy and team management
   - Premium feature set

### Branch Protection

- **main** branch is protected
- All changes require pull request review
- Status checks must pass before merging
- No direct pushes to main branch

## 🧪 Testing

```bash
# Run all tests
npm run test:all

# Run specific package tests
npm run test --workspace=packages/server
npm run test --workspace=packages/web
npm run test --workspace=packages/mobile

# Run linting
npm run lint:all

# Run type checking
npm run typecheck:all
```

## 🔒 Security & Compliance

- **Data Encryption**: AES-256 for sensitive data
- **Professional Verification**: Direct API integration with regulatory bodies
- **Audit Logging**: Complete activity tracking
- **SANS Compliance**: Following South African National Standards
- **Data Retention**: 7-year compliance record retention

## 🌍 South African Context

Tracilo is built specifically for the South African electrical industry:

- **PIRB Integration**: Professional registration verification
- **SAQCC Gas**: Gas installation compliance
- **Department of Labour**: Electrical machinery verification
- **SANS Standards**: National electrical safety standards
- **ECTA Compliance**: Electronic signature requirements

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Standards

- Follow [Coding Standards](docs/architecture/coding-standards.md)
- Write comprehensive tests
- Update documentation
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For questions, issues, or support:

- **Issues**: [GitHub Issues](https://github.com/Kon-404/Tracilo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Kon-404/Tracilo/discussions)
- **Documentation**: [Project Wiki](https://github.com/Kon-404/Tracilo/wiki)

## 🏢 Professional Services

Tracilo is designed by and for South African electrical professionals. For enterprise deployments, custom integrations, or professional services, please contact the development team.

---

**Built with ❤️ for South African Electricians**