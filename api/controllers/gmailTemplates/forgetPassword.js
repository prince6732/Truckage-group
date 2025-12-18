const forgotPasswordTemplate = (token, frontendBaseUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); overflow: hidden; max-width: 600px; width: 100%;">
                    <!-- Header with gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 60px; text-align: center; position: relative;">
                            <div style="background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 11v7H6v-9h12v2zm-7-4h2V7c0-1.654-1.346-3-3-3S8 5.346 8 7v2h2V7c0-.551.449-1 1-1s1 .449 1 1v2z" fill="white"/>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Password Reset</h1>
                            <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Security is our priority</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 30px;">
                            <h2 style="margin: 0 0 16px; color: #1a202c; font-size: 24px; font-weight: 600;">Hello!</h2>
                            <p style="margin: 0 0 24px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password. If you made this request, click the button below to create a new password:
                            </p>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${frontendBaseUrl}/reset-password/${token}" 
                                           style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 12px; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                            Reset Your Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Info Box -->
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    <strong style="color: #78350f;">⏰ Important:</strong> This reset link will expire in <strong>24 hours</strong> for security reasons. You can request a new link after <strong>10 minutes</strong> if needed.
                                </p>
                            </div>

                            <!-- Security Note -->
                            <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px; padding: 16px; margin: 24px 0;">
                                <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.5;">
                                    <strong style="color: #7f1d1d;">🔒 Security Notice:</strong> If you didn't request this password reset, please ignore this email and ensure your account is secure. Your password won't change unless you click the button above.
                                </p>
                            </div>

                            <p style="margin: 24px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                                If you're having trouble clicking the button, copy and paste this URL into your browser:
                            </p>
                            <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin: 12px 0; word-break: break-all;">
                                <a href="${frontendBaseUrl}/reset-password/${token}" style="color: #667eea; text-decoration: none; font-size: 13px;">
                                    ${frontendBaseUrl}/reset-password/${token}
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f7fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 12px; color: #4a5568; font-size: 16px; font-weight: 600;">
                                            Best regards,<br>
                                            <span style="color: #667eea;">FastShip Transport Team</span>
                                        </p>
                                        <p style="margin: 0; color: #718096; font-size: 13px;">
                                            © ${new Date().getFullYear()} FastShip. All rights reserved.
                                        </p>
                                        <div style="margin-top: 16px;">
                                            <a href="#" style="display: inline-block; margin: 0 8px; color: #a0aec0; text-decoration: none; font-size: 12px;">Privacy Policy</a>
                                            <span style="color: #cbd5e0;">|</span>
                                            <a href="#" style="display: inline-block; margin: 0 8px; color: #a0aec0; text-decoration: none; font-size: 12px;">Terms of Service</a>
                                            <span style="color: #cbd5e0;">|</span>
                                            <a href="#" style="display: inline-block; margin: 0 8px; color: #a0aec0; text-decoration: none; font-size: 12px;">Contact Support</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Bottom Spacing -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 12px;">
                                This is an automated message, please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

module.exports = forgotPasswordTemplate;
