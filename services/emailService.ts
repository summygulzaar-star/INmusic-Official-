import brevo from '../lib/brevoClient';
import * as templates from '../templates/emailTemplates';

/**
 * IND Distribution - Transactional Email Service
 * Handles core email sending logic with retry and error handling.
 */

interface SendEmailParams {
  to: string;
  name: string;
  subject: string;
  htmlContent: string;
}

export class EmailService {
  private static sender = {
    email: process.env.SENDER_EMAIL || 'noreply@inddistribution.com',
    name: process.env.SENDER_NAME || 'IND Distribution',
  };

  /**
   * Main send function with Brevo integration
   */
  public static async sendEmail({ to, name, subject, htmlContent }: SendEmailParams) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.warn('⚠️ [EmailService] BREVO_API_KEY is missing. Email simulation mode active.');
      console.log(`[SIMULATION] Sending "${subject}" to ${name} (${to})`);
      return { success: true, simulated: true };
    }

    // Inject APP_URL into templates if they contain placeholders
    const finalHtml = htmlContent.replace(/{{APP_URL}}/g, process.env.APP_URL || 'http://localhost:3000');

    try {
      const response = await brevo.transactionalEmails.sendTransacEmail({
        subject: subject,
        htmlContent: finalHtml,
        sender: this.sender,
        to: [{ email: to, name }],
      });
      
      console.log(`✅ [EmailService] Email sent to ${to}`);
      return { success: true, response };
    } catch (error: any) {
      console.error(`❌ [EmailService] Failed to send email to ${to}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  // --- Specialized Triggers ---

  public static async sendWelcomeEmail(email: string, name: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: 'Welcome to the IND Matrix',
      htmlContent: templates.getWelcomeTemplate(name),
    });
  }

  public static async sendVerificationEmail(email: string, name: string, otp: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: 'Identity Verification Protocol',
      htmlContent: templates.getVerificationTemplate(otp),
    });
  }

  public static async sendUploadConfirmation(email: string, name: string, songName: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: `Asset Receipt: ${songName}`,
      htmlContent: templates.getUploadConfirmationTemplate(songName),
    });
  }

  public static async sendApprovalEmail(email: string, name: string, songName: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: `PROTOCOL APPROVED: ${songName}`,
      htmlContent: templates.getApprovalTemplate(songName),
    });
  }

  public static async sendRejectionEmail(email: string, name: string, songName: string, reason: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: `MISSION INTERRUPTED: ${songName}`,
      htmlContent: templates.getRejectionTemplate(songName, reason),
    });
  }

  public static async sendPaymentInvoice(email: string, name: string, amount: string, txId: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: 'Transaction Confirmed - IND Distribution',
      htmlContent: templates.getInvoiceTemplate(amount, txId),
    });
  }

  public static async sendLiveSuccessEmail(email: string, name: string, songName: string) {
    return this.sendEmail({
      to: email,
      name,
      subject: `TARGET ACQUIRED: ${songName} is LIVE`,
      htmlContent: templates.getLiveSuccessTemplate(songName),
    });
  }
}
