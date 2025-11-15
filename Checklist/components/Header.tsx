'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const { activeOrganization, organizations, switchOrganization, loading: orgLoading } = useOrganization();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    router.push('/landing');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 no-print">
      <div className="container-mobile py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Checklist App</h1>
          </a>

          {/* Navigation links */}
          <nav className="flex items-center space-x-2">
            <a
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors tap-target"
            >
              Home
            </a>
            {user && (
              <>
                <a
                  href="/templates"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors tap-target"
                >
                  Templates
                </a>
                <a
                  href="/submissions"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors tap-target"
                >
                  Submissions
                </a>
              </>
            )}

            {/* Organization Switcher */}
            {user && !orgLoading && organizations.length > 0 && (
              <div className="relative">
                <select
                  value={activeOrganization?.id || ''}
                  onChange={(e) => switchOrganization(e.target.value)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                >
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors tap-target"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-medium text-sm">
                          {user.email?.[0].toUpperCase()}
                        </span>
                      </div>
                    </button>

                    {showUserMenu && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowUserMenu(false)}
                        />

                        {/* Menu */}
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">
                              {user.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                          <a
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Profile Settings
                          </a>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <a
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors tap-target"
                  >
                    Sign In
                  </a>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
