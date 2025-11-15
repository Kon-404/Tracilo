'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
}

interface TeamMember {
  id: string;
  userId: string;
  role: string;
  customPermissions: any;
  email: string;
  fullName: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'invitations'>('profile');

  // Form states
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Team invite state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Transfer ownership state
  const [showTransferOwnership, setShowTransferOwnership] = useState(false);
  const [transferToMemberId, setTransferToMemberId] = useState('');
  const [transferConfirmText, setTransferConfirmText] = useState('');
  const [transferring, setTransferring] = useState(false);
  const [transferMessage, setTransferMessage] = useState('');

  // Create organization state
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrganization();
      fetchTeamMembers();
      fetchPendingInvites();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFullName(data.fullName || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchOrganization = async () => {
    try {
      const res = await fetch('/api/organization');
      if (res.ok) {
        const data = await res.json();
        setOrganization(data);
      }
    } catch (error) {
      console.error('Error fetching organization:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('/api/organization/members');
      if (res.ok) {
        const data = await res.json();
        setTeamMembers(data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchPendingInvites = async () => {
    try {
      const res = await fetch('/api/invitations');
      if (res.ok) {
        const data = await res.json();
        setPendingInvites(data.invites || []);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage('');

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName }),
      });

      if (res.ok) {
        setSaveMessage('Profile updated successfully!');
        fetchProfile();
      } else {
        setSaveMessage('Failed to update profile');
      }
    } catch (error) {
      setSaveMessage('Error updating profile');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setInviteMessage('');

    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });

      if (res.ok) {
        setInviteMessage('Invitation sent successfully!');
        setInviteEmail('');
        setInviteRole('member');
      } else {
        const data = await res.json();
        setInviteMessage(data.error || 'Failed to send invitation');
      }
    } catch (error) {
      setInviteMessage('Error sending invitation');
    } finally {
      setInviting(false);
      setTimeout(() => setInviteMessage(''), 3000);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const res = await fetch(`/api/organization/members/${memberId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/organization/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleToggleCanDelete = async (member: TeamMember) => {
    const currentPerms = member.customPermissions || {};
    const newCanDelete = !currentPerms.canDeleteSubmissions;

    try {
      const res = await fetch(`/api/organization/members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customPermissions: {
            ...currentPerms,
            canDeleteSubmissions: newCanDelete,
          },
        }),
      });

      if (res.ok) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error('Error toggling delete permission:', error);
    }
  };

  const handleTransferOwnership = async () => {
    if (transferConfirmText !== 'TRANSFER') {
      setTransferMessage('Please type TRANSFER to confirm');
      return;
    }

    if (!transferToMemberId) {
      setTransferMessage('Please select a member to transfer ownership to');
      return;
    }

    setTransferring(true);
    setTransferMessage('');

    try {
      const res = await fetch('/api/organization/transfer-ownership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newOwnerId: transferToMemberId,
          confirmText: transferConfirmText,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTransferMessage(data.message || 'Ownership transferred successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTransferMessage(data.error || 'Failed to transfer ownership');
      }
    } catch (error) {
      setTransferMessage('Error transferring ownership');
    } finally {
      setTransferring(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'DELETE',
      });

      if (res.ok) {
        await signOut();
        router.push('/landing');
      } else {
        alert('Failed to delete account');
      }
    } catch (error) {
      alert('Error deleting account');
    } finally {
      setDeleting(false);
    }
  };

  const handleAcceptInvite = async (inviteId: string) => {
    try {
      const res = await fetch(`/api/invitations/${inviteId}/accept`, {
        method: 'POST',
      });

      if (res.ok) {
        // Reload to refresh organizations and data
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to accept invitation');
      }
    } catch (error) {
      alert('Error accepting invitation');
    }
  };

  const handleDeclineInvite = async (inviteId: string) => {
    try {
      const res = await fetch(`/api/invitations/${inviteId}/decline`, {
        method: 'POST',
      });

      if (res.ok) {
        fetchPendingInvites();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to decline invitation');
      }
    } catch (error) {
      alert('Error declining invitation');
    }
  };

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateMessage('');

    try {
      const res = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newOrgName }),
      });

      const data = await res.json();

      if (res.ok) {
        setCreateMessage('Organization created successfully!');
        setNewOrgName('');
        setShowCreateOrg(false);
        // Reload to refresh organizations
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setCreateMessage(data.error || 'Failed to create organization');
      }
    } catch (error) {
      setCreateMessage('Error creating organization');
    } finally {
      setCreating(false);
      setTimeout(() => setCreateMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container-mobile flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const isOwner = organization?.role === 'owner';
  const isAdmin = organization?.role === 'admin' || isOwner;

  return (
    <div className="container-mobile max-w-4xl mx-auto">
      <div className="page-header">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">Manage your account and team</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'profile'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'team'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Team & Organization
          </button>
          <button
            onClick={() => setActiveTab('invitations')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'invitations'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Invitations
            {pendingInvites.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {pendingInvites.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Profile Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Profile Information
            </h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {saveMessage && (
                <div
                  className={`px-4 py-3 rounded-lg text-sm ${
                    saveMessage.includes('success')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {saveMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="card border-red-200 bg-red-50">
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Delete Account
            </h2>
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-900 mb-2">
                    Type <strong>DELETE</strong> to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="DELETE"
                    className="w-full px-4 py-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleting || deleteConfirmText !== 'DELETE'}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          {/* Organization Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Active Organization
            </h2>
            {organization ? (
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Name:
                  </span>
                  <span className="ml-2 text-gray-900">{organization.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Your Role:
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                    {organization.role}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No active organization. Create one or accept an invitation.</p>
            )}
          </div>

          {/* Create Organization */}
          <div className="card border-green-200 bg-green-50">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              Create New Organization
            </h2>
            <p className="text-sm text-green-700 mb-4">
              You can create up to 3 organizations. Each organization has its own team and data.
            </p>

            {!showCreateOrg ? (
              <button
                onClick={() => setShowCreateOrg(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Create Organization
              </button>
            ) : (
              <form onSubmit={handleCreateOrganization} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    required
                    placeholder="My Company Name"
                    className="w-full px-4 py-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-green-700 mt-1">
                    Choose a unique name for your organization
                  </p>
                </div>

                {createMessage && (
                  <div
                    className={`px-4 py-3 rounded-lg text-sm ${
                      createMessage.includes('success')
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {createMessage}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={creating || !newOrgName.trim()}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateOrg(false);
                      setNewOrgName('');
                      setCreateMessage('');
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Transfer Ownership (Owner only) */}
          {isOwner && (
            <div className="card border-orange-200 bg-orange-50">
              <h2 className="text-lg font-semibold text-orange-900 mb-2">
                Transfer Ownership
              </h2>
              <p className="text-sm text-orange-700 mb-4">
                Transfer organization ownership to another team member. You will become an admin.
              </p>

              {!showTransferOwnership ? (
                <button
                  onClick={() => setShowTransferOwnership(true)}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Transfer Ownership
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-900 mb-2">
                      Select new owner
                    </label>
                    <select
                      value={transferToMemberId}
                      onChange={(e) => setTransferToMemberId(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select a member...</option>
                      {teamMembers
                        .filter((m) => m.userId !== user?.id)
                        .map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.fullName || member.email}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-orange-900 mb-2">
                      Type <strong>TRANSFER</strong> to confirm
                    </label>
                    <input
                      type="text"
                      value={transferConfirmText}
                      onChange={(e) => setTransferConfirmText(e.target.value)}
                      placeholder="TRANSFER"
                      className="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {transferMessage && (
                    <div
                      className={`px-4 py-3 rounded-lg text-sm ${
                        transferMessage.includes('success')
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {transferMessage}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handleTransferOwnership}
                      disabled={transferring || transferConfirmText !== 'TRANSFER'}
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {transferring ? 'Transferring...' : 'Confirm Transfer'}
                    </button>
                    <button
                      onClick={() => {
                        setShowTransferOwnership(false);
                        setTransferConfirmText('');
                        setTransferToMemberId('');
                        setTransferMessage('');
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Invite Member (Admin/Owner only) */}
          {isAdmin && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Invite Team Member
              </h2>
              <form onSubmit={handleInviteMember} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                    placeholder="colleague@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    {isOwner && <option value="owner">Owner</option>}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Members can view and create. Admins can manage team and
                    settings.
                  </p>
                </div>

                {inviteMessage && (
                  <div
                    className={`px-4 py-3 rounded-lg text-sm ${
                      inviteMessage.includes('success')
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {inviteMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={inviting}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {inviting ? 'Inviting...' : 'Send Invite'}
                </button>
              </form>
            </div>
          )}

          {/* Team Members List */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Team Members ({teamMembers.length})
            </h2>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {member.fullName || member.email}
                      </p>
                      {member.fullName && (
                        <p className="text-sm text-gray-500">{member.email}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {isAdmin && member.userId !== user?.id ? (
                        <select
                          value={member.role}
                          onChange={(e) =>
                            handleUpdateRole(member.id, e.target.value)
                          }
                          className="px-3 py-1.5 rounded border border-gray-300 text-sm"
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                          {isOwner && <option value="owner">Owner</option>}
                        </select>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                          {member.role}
                        </span>
                      )}
                      {isAdmin && member.userId !== user?.id && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Custom Permissions */}
                  {isAdmin && member.userId !== user?.id && member.role === 'member' && (
                    <div className="border-t border-gray-200 pt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={member.customPermissions?.canDeleteSubmissions || false}
                          onChange={() => handleToggleCanDelete(member)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">
                          Can delete submissions
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
              {teamMembers.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No team members yet
                </p>
              )}
            </div>
          </div>

          {/* Role Permissions Reference */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">
              Role Permissions
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div>
                <strong>Owner:</strong> Full access, can transfer ownership, manage team and delete organization
              </div>
              <div>
                <strong>Admin:</strong> Can manage team members, create templates, delete all submissions
              </div>
              <div>
                <strong>Member:</strong> Can create and edit own submissions, view templates. Deletion requires custom permission.
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-300">
              <p className="text-xs text-blue-700">
                <strong>Custom Permissions:</strong> Admins/Owners can grant members the ability to delete submissions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Invitations Tab */}
      {activeTab === 'invitations' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pending Invitations ({pendingInvites.length})
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              You have been invited to join the following organizations
            </p>

            {pendingInvites.length > 0 ? (
              <div className="space-y-3">
                {pendingInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {invite.organizationName}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>Role:</strong>{' '}
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                              {invite.role}
                            </span>
                          </p>
                          <p>
                            <strong>Invited by:</strong> {invite.invitedBy}
                          </p>
                          <p className="text-xs text-gray-500">
                            Expires on{' '}
                            {new Date(invite.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleAcceptInvite(invite.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                      >
                        Accept Invitation
                      </button>
                      <button
                        onClick={() => handleDeclineInvite(invite.id)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No pending invitations
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any pending organization invitations at this time.
                </p>
              </div>
            )}
          </div>

          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              About Invitations
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                When you accept an invitation, you'll become a member of that organization
                and can access its data and resources based on your assigned role.
              </p>
              <p>
                You can be a member of up to 3 organizations. Invitations expire after 7 days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
