'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AcceptInvitationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid invitation link - no token provided');
      return;
    }

    // If user is not logged in, redirect to login with return URL
    if (!user) {
      const returnUrl = `/invitations/accept?token=${token}`;
      router.push(`/auth/login?redirect=${encodeURIComponent(returnUrl)}`);
      return;
    }

    // Find and accept the invitation by token
    acceptInvitation();
  }, [token, user]);

  const acceptInvitation = async () => {
    if (!token) return;

    try {
      // First, find the invitation by token
      const findRes = await fetch(`/api/invitations/by-token?token=${token}`);

      if (!findRes.ok) {
        const error = await findRes.json();
        setStatus('error');
        setMessage(error.error || 'Invitation not found or expired');
        return;
      }

      const { invite } = await findRes.json();

      // Accept the invitation
      const acceptRes = await fetch(`/api/invitations/${invite.id}/accept`, {
        method: 'POST',
      });

      if (acceptRes.ok) {
        setStatus('success');
        setMessage(`Successfully joined ${invite.organizationName}!`);

        // Redirect to profile after 2 seconds
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      } else {
        const error = await acceptRes.json();
        setStatus('error');
        setMessage(error.error || 'Failed to accept invitation');
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
      setStatus('error');
      setMessage('An error occurred while accepting the invitation');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Processing Invitation...
              </h2>
              <p className="text-gray-600">Please wait while we accept your invitation.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Success!
              </h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">Redirecting you to your profile...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Oops!
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/profile"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Go to Profile
                </a>
                <a
                  href="/"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
