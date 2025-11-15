/**
 * Email service using Resend
 * Handles sending invitation and notification emails
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'Checklist App <onboarding@resend.dev>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface SendInvitationEmailParams {
  to: string;
  organizationName: string;
  invitedBy: string;
  inviteToken: string;
  role: string;
  expiresAt: Date;
}

/**
 * Send invitation email to a new team member
 */
export async function sendInvitationEmail({
  to,
  organizationName,
  invitedBy,
  inviteToken,
  role,
  expiresAt,
}: SendInvitationEmailParams) {
  const acceptUrl = `${APP_URL}/invitations/accept?token=${inviteToken}`;
  const expiryDate = expiresAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: `You've been invited to join ${organizationName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team Invitation</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <div style="background: white; width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 32px; font-weight: bold; color: #0ea5e9;">✓</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">You're Invited!</h1>
            </div>

            <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>${invitedBy}</strong> has invited you to join <strong>${organizationName}</strong> on Checklist App as a <strong>${role}</strong>.
              </p>

              <div style="background: #f9fafb; border-left: 4px solid #0ea5e9; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                  <strong>What is Checklist App?</strong><br>
                  A mobile-first inspection and compliance forms platform for professional teams. Create, complete, and manage checklists with photo documentation, digital signatures, and PDF exports.
                </p>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${acceptUrl}" style="display: inline-block; background: #0ea5e9; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Accept Invitation
                </a>
              </div>

              <p style="font-size: 14px; color: #6b7280; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <strong>Note:</strong> This invitation will expire on <strong>${expiryDate}</strong>.
              </p>

              <p style="font-size: 13px; color: #9ca3af; margin-top: 16px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${acceptUrl}" style="color: #0ea5e9; word-break: break-all;">${acceptUrl}</a>
              </p>
            </div>

            <div style="text-align: center; margin-top: 24px; padding: 20px; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">
                Checklist App - Mobile Inspection Forms<br>
                Professional checklists for vehicle, solar, and gas installations
              </p>
            </div>
          </body>
        </html>
      `,
      // Plain text fallback
      text: `
You've been invited to join ${organizationName}

${invitedBy} has invited you to join ${organizationName} on Checklist App as a ${role}.

Accept your invitation by visiting:
${acceptUrl}

Note: This invitation will expire on ${expiryDate}.

---
Checklist App - Mobile Inspection Forms
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending invitation email:', error);
    return { success: false, error };
  }
}

/**
 * Send reminder email for expiring invitation
 */
export async function sendInvitationReminderEmail({
  to,
  organizationName,
  inviteToken,
  expiresAt,
}: Omit<SendInvitationEmailParams, 'invitedBy' | 'role'>) {
  const acceptUrl = `${APP_URL}/invitations/accept?token=${inviteToken}`;
  const expiryDate = expiresAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: `Reminder: Your invitation to ${organizationName} expires soon`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px;">
              <h2 style="color: #92400e; margin-top: 0;">⏰ Invitation Expiring Soon</h2>
              <p style="color: #78350f;">
                Your invitation to join <strong>${organizationName}</strong> will expire on <strong>${expiryDate}</strong>.
              </p>
              <div style="margin-top: 20px;">
                <a href="${acceptUrl}" style="display: inline-block; background: #f59e0b; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">
                  Accept Now
                </a>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Invitation Expiring Soon

Your invitation to join ${organizationName} will expire on ${expiryDate}.

Accept your invitation: ${acceptUrl}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending reminder email:', error);
    return { success: false, error };
  }
}
