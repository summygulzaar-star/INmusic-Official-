import { EventEmitter } from 'events';
import { EmailService } from '../services/emailService';

/**
 * IND Distribution - Global Event Bus for Notifications
 * Decouples controllers from the email service for better scalability.
 */

const emailEmitter = new EventEmitter();

// --- Event Handlers ---

emailEmitter.on('USER_SIGNUP', async ({ email, name }) => {
  await EmailService.sendWelcomeEmail(email, name);
});

emailEmitter.on('VERIFY_EMAIL', async ({ email, name, otp }) => {
  await EmailService.sendVerificationEmail(email, name, otp);
});

emailEmitter.on('SONG_UPLOADED', async ({ email, name, songName }) => {
  await EmailService.sendUploadConfirmation(email, name, songName);
});

emailEmitter.on('SONG_APPROVED', async ({ email, name, songName }) => {
  await EmailService.sendApprovalEmail(email, name, songName);
});

emailEmitter.on('SONG_REJECTED', async ({ email, name, songName, reason }) => {
  await EmailService.sendRejectionEmail(email, name, songName, reason);
});

emailEmitter.on('PAYMENT_SUCCESS', async ({ email, name, amount, txId }) => {
  await EmailService.sendPaymentInvoice(email, name, amount, txId);
});

emailEmitter.on('SONG_LIVE', async ({ email, name, songName }) => {
  await EmailService.sendLiveSuccessEmail(email, name, songName);
});

export default emailEmitter;
