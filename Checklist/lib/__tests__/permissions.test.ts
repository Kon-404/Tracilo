import { describe, it, expect } from 'vitest';
import {
  hasPermission,
  canPerformAction,
  getRolePermissions,
  getRoleDescription,
  type UserRole,
  type Permission,
} from '../permissions';

describe('Permissions System', () => {
  describe('hasPermission', () => {
    it('owner has all permissions', () => {
      expect(hasPermission('owner', 'view_submissions')).toBe(true);
      expect(hasPermission('owner', 'delete_organization')).toBe(true);
      expect(hasPermission('owner', 'create_templates')).toBe(true);
      expect(hasPermission('owner', 'manage_organization')).toBe(true);
    });

    it('admin has most permissions except delete_organization', () => {
      expect(hasPermission('admin', 'view_submissions')).toBe(true);
      expect(hasPermission('admin', 'edit_all_submissions')).toBe(true);
      expect(hasPermission('admin', 'manage_organization')).toBe(true);
      expect(hasPermission('admin', 'delete_organization')).toBe(false);
    });

    it('member has limited permissions', () => {
      expect(hasPermission('member', 'view_submissions')).toBe(true);
      expect(hasPermission('member', 'create_submissions')).toBe(true);
      expect(hasPermission('member', 'edit_own_submissions')).toBe(true);
      expect(hasPermission('member', 'edit_all_submissions')).toBe(false);
      expect(hasPermission('member', 'delete_all_submissions')).toBe(false);
      expect(hasPermission('member', 'create_templates')).toBe(false);
      expect(hasPermission('member', 'invite_members')).toBe(false);
    });

    it('viewer has read-only permissions', () => {
      expect(hasPermission('viewer', 'view_submissions')).toBe(true);
      expect(hasPermission('viewer', 'view_templates')).toBe(true);
      expect(hasPermission('viewer', 'create_submissions')).toBe(false);
      expect(hasPermission('viewer', 'edit_own_submissions')).toBe(false);
      expect(hasPermission('viewer', 'delete_own_submissions')).toBe(false);
    });
  });

  describe('canPerformAction', () => {
    describe('submission actions', () => {
      it('allows owner to edit own submissions', () => {
        expect(canPerformAction('owner', 'edit', 'submission', true)).toBe(true);
      });

      it('allows owner to edit others submissions', () => {
        expect(canPerformAction('owner', 'edit', 'submission', false)).toBe(true);
      });

      it('allows member to edit own submissions', () => {
        expect(canPerformAction('member', 'edit', 'submission', true)).toBe(true);
      });

      it('does not allow member to edit others submissions', () => {
        expect(canPerformAction('member', 'edit', 'submission', false)).toBe(false);
      });

      it('allows admin to delete any submission', () => {
        expect(canPerformAction('admin', 'delete', 'submission', false)).toBe(true);
      });

      it('allows member to delete own submissions', () => {
        expect(canPerformAction('member', 'delete', 'submission', true)).toBe(true);
      });

      it('does not allow member to delete others submissions', () => {
        expect(canPerformAction('member', 'delete', 'submission', false)).toBe(false);
      });

      it('does not allow viewer to delete any submissions', () => {
        expect(canPerformAction('viewer', 'delete', 'submission', true)).toBe(false);
        expect(canPerformAction('viewer', 'delete', 'submission', false)).toBe(false);
      });

      it('allows member to create submissions', () => {
        expect(canPerformAction('member', 'create', 'submission')).toBe(true);
      });

      it('allows all roles to view submissions', () => {
        expect(canPerformAction('owner', 'view', 'submission')).toBe(true);
        expect(canPerformAction('admin', 'view', 'submission')).toBe(true);
        expect(canPerformAction('member', 'view', 'submission')).toBe(true);
        expect(canPerformAction('viewer', 'view', 'submission')).toBe(true);
      });
    });

    describe('template actions', () => {
      it('allows admin to create templates', () => {
        expect(canPerformAction('admin', 'create', 'template')).toBe(true);
      });

      it('does not allow member to create templates', () => {
        expect(canPerformAction('member', 'create', 'template')).toBe(false);
      });

      it('allows owner to edit templates', () => {
        expect(canPerformAction('owner', 'edit', 'template')).toBe(true);
      });

      it('allows admin to delete templates', () => {
        expect(canPerformAction('admin', 'delete', 'template')).toBe(true);
      });

      it('does not allow viewer to delete templates', () => {
        expect(canPerformAction('viewer', 'delete', 'template')).toBe(false);
      });

      it('allows all roles to view templates', () => {
        expect(canPerformAction('owner', 'view', 'template')).toBe(true);
        expect(canPerformAction('admin', 'view', 'template')).toBe(true);
        expect(canPerformAction('member', 'view', 'template')).toBe(true);
        expect(canPerformAction('viewer', 'view', 'template')).toBe(true);
      });
    });

    describe('member management actions', () => {
      it('allows owner to invite members', () => {
        expect(canPerformAction('owner', 'create', 'member')).toBe(true);
      });

      it('allows admin to remove members', () => {
        expect(canPerformAction('admin', 'delete', 'member')).toBe(true);
      });

      it('allows admin to change member roles', () => {
        expect(canPerformAction('admin', 'edit', 'member')).toBe(true);
      });

      it('does not allow member to manage other members', () => {
        expect(canPerformAction('member', 'create', 'member')).toBe(false);
        expect(canPerformAction('member', 'delete', 'member')).toBe(false);
        expect(canPerformAction('member', 'edit', 'member')).toBe(false);
      });
    });

    describe('organization actions', () => {
      it('allows owner to manage organization', () => {
        expect(canPerformAction('owner', 'edit', 'organization')).toBe(true);
      });

      it('allows owner to delete organization', () => {
        expect(canPerformAction('owner', 'delete', 'organization')).toBe(true);
      });

      it('allows admin to manage organization', () => {
        expect(canPerformAction('admin', 'edit', 'organization')).toBe(true);
      });

      it('does not allow admin to delete organization', () => {
        expect(canPerformAction('admin', 'delete', 'organization')).toBe(false);
      });

      it('does not allow member to manage organization', () => {
        expect(canPerformAction('member', 'edit', 'organization')).toBe(false);
        expect(canPerformAction('member', 'delete', 'organization')).toBe(false);
      });
    });
  });

  describe('getRolePermissions', () => {
    it('returns all permissions for owner', () => {
      const permissions = getRolePermissions('owner');
      expect(permissions).toHaveLength(15);
      expect(permissions).toContain('delete_organization');
    });

    it('returns admin permissions without delete_organization', () => {
      const permissions = getRolePermissions('admin');
      expect(permissions).toHaveLength(14);
      expect(permissions).not.toContain('delete_organization');
      expect(permissions).toContain('manage_organization');
    });

    it('returns limited permissions for member', () => {
      const permissions = getRolePermissions('member');
      expect(permissions).toHaveLength(5);
      expect(permissions).toEqual([
        'view_submissions',
        'create_submissions',
        'edit_own_submissions',
        'delete_own_submissions',
        'view_templates',
      ]);
    });

    it('returns read-only permissions for viewer', () => {
      const permissions = getRolePermissions('viewer');
      expect(permissions).toHaveLength(2);
      expect(permissions).toEqual(['view_submissions', 'view_templates']);
    });
  });

  describe('getRoleDescription', () => {
    it('returns description for owner', () => {
      const description = getRoleDescription('owner');
      expect(description).toContain('Full access');
      expect(description).toContain('organization management');
    });

    it('returns description for admin', () => {
      const description = getRoleDescription('admin');
      expect(description).toContain('manage team members');
    });

    it('returns description for member', () => {
      const description = getRoleDescription('member');
      expect(description).toContain('create and edit own submissions');
    });

    it('returns description for viewer', () => {
      const description = getRoleDescription('viewer');
      expect(description).toContain('Read-only');
    });
  });

  describe('Permission hierarchy', () => {
    it('owner has more permissions than admin', () => {
      const ownerPerms = getRolePermissions('owner');
      const adminPerms = getRolePermissions('admin');
      expect(ownerPerms.length).toBeGreaterThan(adminPerms.length);
    });

    it('admin has more permissions than member', () => {
      const adminPerms = getRolePermissions('admin');
      const memberPerms = getRolePermissions('member');
      expect(adminPerms.length).toBeGreaterThan(memberPerms.length);
    });

    it('member has more permissions than viewer', () => {
      const memberPerms = getRolePermissions('member');
      const viewerPerms = getRolePermissions('viewer');
      expect(memberPerms.length).toBeGreaterThan(viewerPerms.length);
    });

    it('viewer permissions are subset of member permissions', () => {
      const viewerPerms = getRolePermissions('viewer');
      const memberPerms = getRolePermissions('member');
      const allViewerPermsInMember = viewerPerms.every(perm => memberPerms.includes(perm));
      expect(allViewerPermsInMember).toBe(true);
    });
  });
});
