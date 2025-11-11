# Architecture Documentation

**Checklist App - System Design and Technical Architecture**

Version: 1.0 (MVP)
Last Updated: 2024

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Principles](#architecture-principles)
3. [Data Model](#data-model)
4. [Component Hierarchy](#component-hierarchy)
5. [Data Flow](#data-flow)
6. [File Structure](#file-structure)
7. [State Management](#state-management)
8. [Styling Strategy](#styling-strategy)
9. [Routing](#routing)
10. [Future Architecture](#future-architecture)
11. [Security Considerations](#security-considerations)
12. [Performance Optimization](#performance-optimization)

---

## System Overview

### Purpose

The Checklist App is a mobile-first web application designed to digitize and streamline inspection and compliance workflows. It provides a flexible, template-based system for creating, completing, and managing checklists across various industries.

### Core Requirements

1. **Scalability** - Support unlimited templates and field types without code changes
2. **Mobile-First** - Optimized for field workers using mobile devices
3. **Extensibility** - Easy to add new features (auth, PDF, photos) without refactoring
4. **Type Safety** - Prevent runtime errors through TypeScript
5. **Developer Experience** - Clear structure, well-documented, easy onboarding

### Technology Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| **Framework** | Next.js 14 (App Router) | - SSR for performance<br>- File-based routing<br>- API routes (no separate backend)<br>- Built-in optimization<br>- Production-ready |
| **Language** | TypeScript | - Catch errors at compile time<br>- Better IDE support<br>- Self-documenting code<br>- Easier refactoring |
| **Styling** | Tailwind CSS | - Mobile-first by default<br>- Rapid development<br>- Consistent design system<br>- Small bundle size |
| **Storage (MVP)** | localStorage | - Zero backend setup<br>- Instant persistence<br>- Easy migration path to DB |
| **Storage (Future)** | PostgreSQL + Prisma | - Relational data model<br>- Type-safe queries<br>- Migration system |

---

## Architecture Principles

### 1. Separation of Concerns

```
Presentation Layer (UI)
  ↓
Business Logic Layer (Utilities, Validation)
  ↓
Data Access Layer (Storage, API)
  ↓
Data Layer (Models, Types)
```

**Why:**
- Each layer has a single responsibility
- Easy to test components in isolation
- Changes in one layer don't cascade
- Clear mental model for developers

### 2. Component Composition

```
Page (Route-level component)
  ↓
Container Components (Data fetching, state management)
  ↓
Presentational Components (Pure UI)
  ↓
Base Components (Buttons, inputs, cards)
```

**Why:**
- Reusable components across pages
- Easy to maintain and update
- Testable in isolation
- Follows React best practices

### 3. Type-Driven Development

All data structures are defined as TypeScript interfaces before implementation.

**Why:**
- Prevents runtime errors
- Auto-completion in IDE
- Easier refactoring
- Self-documenting code

### 4. Mobile-First Progressive Enhancement

Start with mobile layout, then enhance for larger screens.

**Why:**
- Primary use case is mobile
- Simpler to scale up than down
- Better performance on mobile
- Follows web standards

---

## Data Model

### Entity Relationship Diagram

```
FormTemplate (1) ──< (n) FormSection (1) ──< (n) FormField
      │                                              │
      │                                              │
      └─────< FormSubmission (1) ──< (n) FormAnswer ┘
```

### Core Entities

#### 1. FormTemplate

Represents a reusable checklist template (e.g., "Vehicle Daily Checklist")

```typescript
interface FormTemplate {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  category: string;              // Grouping (vehicle, solar, gas)
  description: string;           // Purpose/instructions
  icon?: string;                 // Emoji or icon identifier
  sections: FormSection[];       // Ordered sections
  createdAt: Date;
  updatedAt: Date;
}
```

**Design Decisions:**
- `id` is string to support various ID strategies (UUID, nanoid, DB auto-increment)
- `category` is extensible string (not enum) for easy addition of new categories
- `sections` embedded for denormalization (easier querying)
- `icon` optional for visual distinction

#### 2. FormSection

Logical grouping of related fields within a template

```typescript
interface FormSection {
  id: string;
  templateId: string;            // Parent template
  title: string;                 // Section heading
  description?: string;          // Optional guidance
  order: number;                 // Display sequence (0-based)
  fields: FormField[];           // Ordered fields
}
```

**Design Decisions:**
- `order` allows reordering without changing IDs
- `fields` embedded (denormalized) for template retrieval efficiency
- `description` optional for flexibility

#### 3. FormField

Individual input field within a section

```typescript
interface FormField {
  id: string;
  sectionId: string;
  type: FieldType;               // text, number, dropdown, etc.
  label: string;                 // Field prompt
  placeholder?: string;
  helpText?: string;             // Additional guidance
  required: boolean;             // Validation flag
  order: number;
  config?: FieldConfig;          // Type-specific configuration
}
```

**Design Decisions:**
- `type` determines rendering logic (polymorphic field)
- `config` uses optional object for type-specific settings (e.g., dropdown options)
- `required` flag drives validation
- Generic structure supports all current and future field types

#### 4. FieldType (Union Type)

```typescript
type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'dropdown'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'photo'
  | 'signature';
```

**Design Decisions:**
- Union type provides autocomplete and type checking
- Easy to extend with new types
- Discriminated union pattern for type-safe rendering

#### 5. FieldConfig

Type-specific configuration object

```typescript
interface FieldConfig {
  // Dropdown
  options?: string[];

  // Number
  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  // Text/Textarea
  maxLength?: number;
  pattern?: string;

  // Photo
  maxFiles?: number;
  acceptedFormats?: string[];

  // Extensible
  [key: string]: any;
}
```

**Design Decisions:**
- All properties optional (not all fields need config)
- Index signature allows future extensions
- Specific types (not `any`) for known configs

#### 6. FormSubmission

Completed instance of a template

```typescript
interface FormSubmission {
  id: string;
  templateId: string;
  templateName: string;          // Denormalized for display
  category: string;              // Denormalized
  submittedAt: Date;
  submittedBy?: string;          // Future: user ID
  status: 'draft' | 'completed';
  answers: FormAnswer[];
  metadata?: object;             // Future: GPS, device info
}
```

**Design Decisions:**
- Denormalization (`templateName`, `category`) for efficient list views
- `status` supports draft saves (future feature)
- `metadata` extensible object for future data (location, photos, etc.)

#### 7. FormAnswer

Individual field response within a submission

```typescript
interface FormAnswer {
  fieldId: string;
  fieldLabel: string;            // Denormalized for PDF
  fieldType: FieldType;          // For rendering in views
  sectionTitle: string;          // Denormalized for grouping
  value: string | string[] | boolean | number | null;
  photoUrls?: string[];          // Future
}
```

**Design Decisions:**
- Denormalization allows submission viewing without template lookup
- `value` type union supports all field types
- `photoUrls` array for multi-photo fields

---

## Component Hierarchy

### Page Components

#### 1. Home Page (`app/page.tsx`)

```
HomePage
├── TemplateCard (x3 for each template)
│   ├── Icon
│   ├── Title
│   ├── Description
│   └── Metadata (sections, fields count)
└── Stats Cards
```

**Responsibilities:**
- Display all available templates
- Show high-level stats
- Navigate to form page on selection

#### 2. Form Page (`app/form/[id]/page.tsx`)

```
FormPage
├── Header (template info, back button)
├── Progress Bar
├── Error Summary (conditional)
└── Form
    ├── FormSection (x n sections)
    │   └── FormField (x n fields per section)
    │       ├── Label
    │       ├── Input (dynamic based on type)
    │       ├── Help Text
    │       └── Error Message
    └── Submit Buttons
```

**Responsibilities:**
- Load template by ID
- Manage form state (values, errors)
- Validate on submit
- Save submission to storage
- Navigate to submission view

#### 3. Submissions List (`app/submissions/page.tsx`)

```
SubmissionsPage
├── Header
├── Stats
├── Category Filters
└── Submission Cards (x n submissions)
    ├── Template Name
    ├── Submission Date
    ├── Category Badge
    └── Status Badge
```

**Responsibilities:**
- Load all submissions from storage
- Filter by category
- Sort by date (newest first)
- Navigate to detail view

#### 4. Submission Detail (`app/submissions/[id]/page.tsx`)

```
SubmissionDetailPage
├── Header (back button)
├── Submission Metadata Card
├── Action Buttons (PDF, Print)
└── Sections (grouped answers)
    └── Answer Item (x n per section)
        ├── Field Label
        └── Formatted Value
```

**Responsibilities:**
- Load submission by ID
- Group answers by section
- Format values for display
- Trigger PDF download (stubbed)
- Support browser print

### Reusable Components

#### 1. TemplateCard (`components/TemplateCard.tsx`)

**Props:**
```typescript
interface TemplateCardProps {
  template: FormTemplate;
}
```

**Responsibilities:**
- Display template summary
- Navigate to form on click
- Show category badge
- Calculate field count

#### 2. FormField (`components/FormField.tsx`)

**Props:**
```typescript
interface FormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}
```

**Responsibilities:**
- Render appropriate input based on `field.type`
- Handle value changes
- Display validation errors
- Apply mobile-optimized input types

**Field Type Mapping:**

| FieldType | HTML Input | Mobile Keyboard |
|-----------|------------|-----------------|
| text | `<input type="text">` | Default |
| textarea | `<textarea>` | Default |
| number | `<input type="number" inputMode="numeric">` | Numeric |
| dropdown | `<select>` | Picker |
| checkbox | `<input type="checkbox">` | N/A |
| date | `<input type="date">` | Date picker |
| time | `<input type="time">` | Time picker |
| photo | Custom upload component | N/A |
| signature | Canvas signature pad | N/A |

---

## Data Flow

### 1. Template Selection Flow

```
User clicks template card
  ↓
Navigate to /form/[id]
  ↓
FormPage loads
  ↓
getTemplateById(id) from data/templates.ts
  ↓
Initialize form state (empty object)
  ↓
Render sections and fields
```

### 2. Form Completion Flow

```
User enters value in field
  ↓
onChange handler in FormField
  ↓
Update formData state in FormPage
  ↓
Clear validation error for that field
  ↓
Recalculate progress percentage
  ↓
Update progress bar
```

### 3. Form Submission Flow

```
User clicks "Submit Checklist"
  ↓
Form onSubmit handler
  ↓
Validate all required fields
  ↓
If errors exist:
  - Set errors state
  - Scroll to first error
  - Show error summary
  - Stop submission
  ↓
If valid:
  - Build FormSubmission object
  - Generate unique ID
  - Map formData to FormAnswer[]
  - saveSubmission() to localStorage
  - Navigate to /submissions/[id]
```

### 4. Submission Viewing Flow

```
User navigates to /submissions
  ↓
SubmissionsPage loads
  ↓
getAllSubmissions() from localStorage
  ↓
Sort by date (newest first)
  ↓
Render submission cards
  ↓
User clicks submission
  ↓
Navigate to /submissions/[id]
  ↓
getSubmissionById(id)
  ↓
Group answers by sectionTitle
  ↓
Render sections and answers
```

---

## File Structure

### Directory Organization

```
checklist-app/
├── app/                    # Next.js App Router (routes)
├── components/             # Reusable UI components
├── data/                   # Static data (templates)
├── lib/                    # Utilities and helpers
├── types/                  # TypeScript definitions
├── docs/                   # Documentation
└── public/                 # Static assets
```

### Naming Conventions

- **Components**: PascalCase (e.g., `TemplateCard.tsx`)
- **Utilities**: camelCase (e.g., `storage.ts`)
- **Types**: PascalCase interfaces (e.g., `FormTemplate`)
- **Pages**: Next.js convention (`page.tsx`, `layout.tsx`)

### Import Aliases

Defined in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/lib/*": ["./lib/*"],
    "@/types/*": ["./types/*"],
    "@/data/*": ["./data/*"]
  }
}
```

**Benefits:**
- Avoid relative import hell (`../../../`)
- Easy refactoring
- Clear import source

---

## State Management

### Current (MVP) Strategy

**Local Component State (useState)**

All state is managed at the page level with React hooks.

**Why:**
- Simple and sufficient for MVP
- No global state needed yet
- Easy to understand and debug
- No additional dependencies

**Example (FormPage):**

```typescript
const [formData, setFormData] = useState<Record<string, any>>({});
const [errors, setErrors] = useState<Record<string, string>>({});
const [isSubmitting, setIsSubmitting] = useState(false);
```

### Future Strategy

When adding authentication and complex features:

**Option 1: React Context + useReducer**
- Good for: User auth, theme, app-wide settings
- Pros: Built-in, no dependencies
- Cons: Can cause unnecessary re-renders

**Option 2: Zustand**
- Good for: Global app state, caching
- Pros: Minimal boilerplate, great DX
- Cons: Another dependency

**Option 3: TanStack Query (React Query)**
- Good for: Server state, caching, data fetching
- Pros: Handles loading/error states, cache invalidation
- Cons: Learning curve

**Recommended:** Zustand for client state + TanStack Query for server state

---

## Styling Strategy

### Tailwind CSS Utility-First Approach

**Core Principles:**

1. **Mobile-First Breakpoints**
   ```css
   /* Base: mobile (< 640px) */
   <div className="p-4">

   /* Tablet (≥ 640px) */
   <div className="p-4 sm:p-6">

   /* Desktop (≥ 1024px) */
   <div className="p-4 sm:p-6 lg:p-8">
   ```

2. **Reusable Component Classes**
   Defined in `globals.css` using `@layer components`:
   ```css
   .btn-primary {
     @apply px-4 py-2.5 rounded-lg bg-primary-600 text-white ...;
   }
   ```

3. **Design Tokens**
   Configured in `tailwind.config.js`:
   ```javascript
   theme: {
     extend: {
       colors: {
         primary: { 500: '#0ea5e9', 600: '#0284c7', ... }
       }
     }
   }
   ```

**Benefits:**
- Consistent spacing, colors, typography
- No CSS file switching
- Automatic tree-shaking (unused styles removed)
- Mobile-first by default

---

## Routing

### Next.js App Router (File-Based)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Home (template list) |
| `/form/[id]` | `app/form/[id]/page.tsx` | Dynamic form rendering |
| `/submissions` | `app/submissions/page.tsx` | Submissions list |
| `/submissions/[id]` | `app/submissions/[id]/page.tsx` | Submission detail |

### Dynamic Routes

**Template ID (`/form/[id]`)**
```typescript
export default function FormPage({ params }: { params: { id: string } }) {
  const template = getTemplateById(params.id);
  // ...
}
```

**Submission ID (`/submissions/[id]`)**
```typescript
export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const submission = getSubmissionById(params.id);
  // ...
}
```

---

## Future Architecture

### Phase 2: Database Integration

**Migration Path:**

1. **Set up Prisma**
   ```bash
   npm install @prisma/client
   npx prisma init
   ```

2. **Define Schema (`prisma/schema.prisma`)**
   ```prisma
   model FormTemplate {
     id        String   @id @default(cuid())
     name      String
     category  String
     sections  FormSection[]
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

3. **Generate Types**
   ```bash
   npx prisma generate
   ```

4. **Replace Storage Layer**
   - `lib/storage.ts` → `lib/db.ts`
   - `getTemplateById()` now queries Prisma
   - Component code unchanged (same interfaces)

### Phase 3: Authentication

**NextAuth.js Integration**

1. Install NextAuth
2. Create `app/api/auth/[...nextauth]/route.ts`
3. Add middleware for protected routes
4. Update submission model with `userId`

### Phase 4: Offline PWA

**Service Worker + IndexedDB**

1. Cache templates for offline access
2. Queue submissions when offline
3. Sync when connection restored

---

## Security Considerations

### Current (MVP)

- No authentication (public access)
- localStorage is client-side only (no sensitive data exposure to server)
- No API routes yet (no attack surface)

### Future

1. **Authentication & Authorization**
   - JWT tokens with short expiration
   - Role-based access (admin, inspector, viewer)
   - CSRF protection on mutations

2. **Input Validation**
   - Sanitize all user inputs
   - Validate on both client and server
   - Use Zod for schema validation

3. **Data Encryption**
   - HTTPS only in production
   - Encrypt sensitive fields in database
   - Hash passwords with bcrypt

4. **Rate Limiting**
   - Limit API requests per user
   - Prevent brute force attacks
   - Use Redis for distributed rate limiting

---

## Performance Optimization

### Current Optimizations

1. **Server-Side Rendering (SSR)**
   - Fast initial page load
   - SEO-friendly

2. **Automatic Code Splitting**
   - Each route is a separate bundle
   - Lazy loading by default

3. **Tailwind CSS Purging**
   - Unused styles removed
   - ~5KB final CSS bundle

4. **Image Optimization**
   - (Future: Next.js Image component)

### Future Optimizations

1. **Caching Strategy**
   - Cache templates (rarely change)
   - Invalidate on updates
   - Use SWR or React Query

2. **Virtual Scrolling**
   - For long submission lists
   - Use react-window

3. **Compression**
   - Gzip/Brotli on server
   - Compress images (WebP)

4. **CDN**
   - Serve static assets from edge
   - Reduce latency globally

---

## Design Patterns

### 1. Compound Components (Future)

For complex UI like form builders:

```typescript
<FormBuilder>
  <FormBuilder.Section>
    <FormBuilder.Field type="text" />
  </FormBuilder.Section>
</FormBuilder>
```

### 2. Render Props (Current)

Dynamic field rendering:

```typescript
<FormField
  field={field}
  render={(props) => <CustomInput {...props} />}
/>
```

### 3. HOCs (Future)

Authentication guards:

```typescript
export default withAuth(SubmissionsPage, { role: 'inspector' });
```

---

## Testing Strategy (Future)

### Unit Tests

- **Utilities**: `lib/storage.ts`, validation functions
- **Pure Components**: `TemplateCard`, `FormField`
- **Tool**: Jest + Testing Library

### Integration Tests

- **Page flows**: Complete form → submit → view
- **Tool**: Playwright or Cypress

### E2E Tests

- **Critical paths**: User completes vehicle checklist
- **Tool**: Playwright

---

## Deployment Architecture (Future)

```
                     ┌─────────────┐
                     │   Vercel    │
                     │   (CDN)     │
                     └──────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
       ┌──────▼──────┐            ┌──────▼──────┐
       │  Next.js    │            │  PostgreSQL │
       │  (Server)   │◄───────────│  (Supabase) │
       └─────────────┘            └─────────────┘
```

---

## Conclusion

This architecture balances **simplicity** (for MVP speed) with **extensibility** (for future growth). Key architectural wins:

✅ **Type-safe** - TypeScript prevents runtime errors
✅ **Modular** - Easy to add features without refactoring
✅ **Mobile-optimized** - Built for field workers from day one
✅ **Developer-friendly** - Clear structure, well-documented
✅ **Production-ready** - Scales to thousands of users

Next steps: Implement database persistence, PDF generation, and authentication.
