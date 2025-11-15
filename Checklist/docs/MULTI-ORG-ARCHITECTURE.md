# Multi-Organization Architecture

This document explains how the multi-organization system works in the Checklist App.

## Overview

Users can belong to multiple organizations (max 3) and switch between them. Each organization has its own:
- Team members
- Checklists/Templates
- Submissions
- Settings

## Key Concepts

### Organizations
- Each organization is independent
- Organization names must be globally unique
- Users can create up to 3 organizations
- Each organization has one owner (can be transferred)

### Active Organization
- Users select which organization they're currently working in
- Stored in cookies/local storage
- All data queries filtered by active organization
- Switching orgs switches the entire context

### Memberships
- Users can be members of multiple organizations
- Each membership has a role: Owner, Admin, Member
- Roles determine permissions within that organization
- Custom permissions can be assigned per member

### Pending Invitations
- Invitations sent by organization owners/admins
- Stored in database until accepted/declined
- Email notification sent to invitee
- In-app notification visible on login
- Expires after 7 days (configurable)

## Database Schema

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String   @unique  // Globally unique
  slug      String   @unique  // URL-friendly version
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members     OrganizationMember[]
  submissions FormSubmission[]
  invites     PendingInvite[]
}

model OrganizationMember {
  id                String   @id @default(cuid())
  organizationId    String
  userId            String
  role              String   @default("member")
  customPermissions Json?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  organization Organization @relation(...)
  user         UserProfile  @relation(...)

  @@unique([organizationId, userId])
}

model PendingInvite {
  id             String   @id @default(cuid())
  organizationId String
  email          String
  role           String   @default("member")
  invitedBy      String   // userId
  token          String   @unique  // For email links
  expiresAt      DateTime
  createdAt      DateTime @default(now())

  organization Organization @relation(...)
  inviter      UserProfile  @relation(...)

  @@index([email])
  @@index([token])
}

model UserProfile {
  // ... existing fields ...
  activeOrganizationId String?  // Currently selected org
}
```

## User Flows

### 1. New User Signup
```
User signs up
→ No organizations yet
→ Redirected to welcome page
→ Options: "Create Organization" or "Check Pending Invites"
→ User chooses action
```

### 2. Creating an Organization
```
User clicks "Create Organization"
→ Check: User has < 3 orgs
→ Enter organization name
→ Validate: Name is unique
→ Create organization
→ User becomes owner
→ Set as active organization
→ Redirect to dashboard
```

### 3. Inviting a Team Member
```
Owner/Admin goes to Profile → Team
→ Clicks "Invite Member"
→ Enters email and role
→ System checks:
   - Does user with email exist?
   - Is user already a member?
   - Does invite already exist?
→ Create PendingInvite record
→ Send email notification
→ Show success message
```

### 4. Accepting an Invitation
```
User receives email
→ Clicks "Accept Invitation" link
→ If not logged in: Login/Signup
→ If logged in: View invite details
→ User clicks "Accept"
→ System checks:
   - Invite not expired
   - User not already member
→ Create OrganizationMember
→ Delete PendingInvite
→ Switch to new organization
→ Show welcome message
```

### 5. Switching Organizations
```
User clicks organization dropdown in header
→ Shows list of organizations user belongs to
→ User selects organization
→ Update activeOrganizationId
→ Reload page/data
→ All queries now scoped to new org
```

## API Endpoints

### Organization Management

```typescript
GET /api/organizations
// List all organizations user belongs to

POST /api/organizations
// Create new organization
Body: { name: string }
Returns: Organization

GET /api/organizations/[id]
// Get organization details

PUT /api/organizations/[id]
// Update organization settings
Body: { name?: string, ... }

DELETE /api/organizations/[id]
// Delete organization (owner only)
```

### Organization Switching

```typescript
POST /api/organizations/switch
// Switch active organization
Body: { organizationId: string }
Returns: { success: boolean }
```

### Invitation Management

```typescript
GET /api/invitations
// Get pending invitations for current user

POST /api/invitations
// Send invitation (admin/owner only)
Body: { email: string, role: string, organizationId: string }

POST /api/invitations/[id]/accept
// Accept invitation

POST /api/invitations/[id]/decline
// Decline invitation

DELETE /api/invitations/[id]
// Cancel invitation (admin/owner only)
```

## Frontend Implementation

### Organization Context

```typescript
// contexts/OrganizationContext.tsx
const OrganizationContext = createContext({
  activeOrganization: null,
  organizations: [],
  switchOrganization: (id: string) => {},
  loading: boolean,
});

// Usage in components
const { activeOrganization, switchOrganization } = useOrganization();
```

### Organization Switcher Component

```typescript
// components/OrganizationSwitcher.tsx
<select
  value={activeOrganization?.id}
  onChange={(e) => switchOrganization(e.target.value)}
>
  {organizations.map(org => (
    <option key={org.id} value={org.id}>
      {org.name}
    </option>
  ))}
</select>
```

### Data Fetching with Org Context

```typescript
// All queries automatically filtered by active org
const submissions = await fetch('/api/submissions');
// Backend filters by activeOrganizationId from session

// Templates scoped to org
const templates = await fetch('/api/templates');
```

## Security Considerations

### Data Isolation
- All queries MUST filter by organizationId
- Never expose data from other organizations
- Validate user has access to organization in every API call

### Permission Checks
```typescript
// Middleware pattern
async function requireOrgAccess(req, orgId) {
  const user = await getUser(req);
  const membership = await getMembership(user.id, orgId);

  if (!membership) {
    throw new Error('Unauthorized');
  }

  return membership;
}

// Check permissions
async function requireRole(membership, requiredRole) {
  if (!hasRole(membership.role, requiredRole)) {
    throw new Error('Insufficient permissions');
  }
}
```

### Rate Limiting
- Limit organization creation: 3 per user
- Limit invitations: 10 per hour per org
- Limit API calls: TBD based on tier

## State Management

### Session/Cookie Storage
```typescript
// Store in secure HTTP-only cookie
{
  userId: string,
  activeOrganizationId: string,
  sessionToken: string
}
```

### Client State
```typescript
// Store in React context + local storage
{
  user: User,
  activeOrganization: Organization,
  organizations: Organization[],
  pendingInvites: Invite[]
}
```

## Migration Strategy

### Migrating Existing Users
```sql
-- Create default organization for existing users
INSERT INTO organizations (id, name, slug)
SELECT
  'org_' || user_profiles.id,
  user_profiles.email || '''s Organization',
  LOWER(REGEXP_REPLACE(user_profiles.email, '[^a-zA-Z0-9]+', '-'))
FROM user_profiles;

-- Create owner memberships
INSERT INTO organization_members (organization_id, user_id, role)
SELECT
  'org_' || user_profiles.id,
  user_profiles.id,
  'owner'
FROM user_profiles;

-- Update submissions to link to orgs
UPDATE form_submissions
SET organization_id = 'org_' || user_id
WHERE organization_id IS NULL;
```

## Testing Strategy

### Unit Tests
- Organization creation validation
- Unique name constraint
- Max organization limit (3)
- Permission checks

### Integration Tests
- Full invitation flow
- Organization switching
- Data isolation between orgs
- Ownership transfer

### E2E Tests
- User creates org → invites member → member accepts
- User switches between 3 organizations
- Data only shows for active org

## Performance Optimization

### Caching
- Cache organization list per user
- Cache active organization
- Invalidate on org change

### Database Indexes
```sql
CREATE INDEX idx_org_members_user_id ON organization_members(user_id);
CREATE INDEX idx_org_members_org_id ON organization_members(organization_id);
CREATE INDEX idx_invites_email ON pending_invites(email);
CREATE INDEX idx_invites_token ON pending_invites(token);
CREATE INDEX idx_submissions_org_id ON form_submissions(organization_id);
```

### Query Optimization
- Use select specific fields, not SELECT *
- Join only necessary tables
- Paginate large result sets
- Use prepared statements

## Monitoring & Alerts

### Metrics to Track
- Organizations created per day
- Invitations sent/accepted/declined
- Average members per org
- Organization switches per user
- Failed permission checks

### Alerts
- Unusual org creation rate
- High invitation decline rate
- Permission errors spike
- Database query performance degradation

## Rollout Plan

### Phase 1: Foundation
- [ ] Update schema
- [ ] Migrate existing data
- [ ] Create organization context
- [ ] Add organization switcher UI

### Phase 2: Invitations
- [ ] Pending invites table
- [ ] Invitation APIs
- [ ] Email notifications
- [ ] Accept/decline UI

### Phase 3: Polish
- [ ] Empty states
- [ ] Error handling
- [ ] Loading states
- [ ] Comprehensive testing

### Phase 4: Production
- [ ] Performance testing
- [ ] Security audit
- [ ] Documentation
- [ ] Deploy

## Troubleshooting

### Common Issues

**Issue:** User can't see organization data
- Check: activeOrganizationId is set
- Check: User is member of organization
- Check: API queries include organizationId filter

**Issue:** Invitation not received
- Check: Email exists in pending_invites
- Check: Email service is working
- Check: Invitation not expired
- Check: User email is correct

**Issue:** Cannot switch organizations
- Check: User is member of target org
- Check: Organization exists
- Check: Cookie/session is valid

## Future Enhancements

- [ ] Organization hierarchy (parent/child orgs)
- [ ] Cross-organization reporting
- [ ] Organization templates
- [ ] Bulk user import
- [ ] SSO integration per org
- [ ] Custom branding per org
- [ ] Organization-level billing

---

**Version:** 1.0
**Last Updated:** 2025-11-13
**Status:** In Development
