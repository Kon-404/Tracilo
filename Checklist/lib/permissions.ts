/**
 * Role-based permissions system
 *
 * Defines what each role can do in the application
 */

export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

export type Permission =
  | 'view_submissions'
  | 'create_submissions'
  | 'edit_own_submissions'
  | 'edit_all_submissions'
  | 'delete_own_submissions'
  | 'delete_all_submissions'
  | 'view_templates'
  | 'create_templates'
  | 'edit_templates'
  | 'delete_templates'
  | 'invite_members'
  | 'remove_members'
  | 'change_member_roles'
  | 'manage_organization'
  | 'delete_organization';

/**
 * Permission mapping for each role
 */
const rolePermissions: Record<UserRole, Permission[]> = {
  owner: [
    // All permissions
    'view_submissions',
    'create_submissions',
    'edit_own_submissions',
    'edit_all_submissions',
    'delete_own_submissions',
    'delete_all_submissions',
    'view_templates',
    'create_templates',
    'edit_templates',
    'delete_templates',
    'invite_members',
    'remove_members',
    'change_member_roles',
    'manage_organization',
    'delete_organization',
  ],
  admin: [
    // Most permissions except delete organization
    'view_submissions',
    'create_submissions',
    'edit_own_submissions',
    'edit_all_submissions',
    'delete_own_submissions',
    'delete_all_submissions',
    'view_templates',
    'create_templates',
    'edit_templates',
    'delete_templates',
    'invite_members',
    'remove_members',
    'change_member_roles',
    'manage_organization',
  ],
  member: [
    // Basic member permissions
    'view_submissions',
    'create_submissions',
    'edit_own_submissions',
    'delete_own_submissions',
    'view_templates',
  ],
  viewer: [
    // Read-only permissions
    'view_submissions',
    'view_templates',
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

/**
 * Check if a role can perform an action on a resource
 */
export function canPerformAction(
  userRole: UserRole,
  action: 'view' | 'create' | 'edit' | 'delete',
  resource: 'submission' | 'template' | 'member' | 'organization',
  isOwner: boolean = false
): boolean {
  // Special cases
  if (action === 'edit' && resource === 'submission') {
    if (isOwner) {
      return hasPermission(userRole, 'edit_own_submissions');
    }
    return hasPermission(userRole, 'edit_all_submissions');
  }

  if (action === 'delete' && resource === 'submission') {
    if (isOwner) {
      return hasPermission(userRole, 'delete_own_submissions');
    }
    return hasPermission(userRole, 'delete_all_submissions');
  }

  // General case - construct permission string
  const permissionMap: Record<string, Permission> = {
    'view_submission': 'view_submissions',
    'create_submission': 'create_submissions',
    'view_template': 'view_templates',
    'create_template': 'create_templates',
    'edit_template': 'edit_templates',
    'delete_template': 'delete_templates',
    'create_member': 'invite_members',
    'delete_member': 'remove_members',
    'edit_member': 'change_member_roles',
    'edit_organization': 'manage_organization',
    'delete_organization': 'delete_organization',
  };

  const permissionKey = `${action}_${resource}` as keyof typeof permissionMap;
  const permission = permissionMap[permissionKey];

  return permission ? hasPermission(userRole, permission) : false;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}

/**
 * Get a user-friendly description of a role
 */
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    owner: 'Full access to everything, including organization management and deletion',
    admin: 'Can manage team members, create/edit/delete templates and submissions',
    member: 'Can create and edit own submissions, view templates',
    viewer: 'Read-only access to submissions and templates',
  };

  return descriptions[role] || '';
}
