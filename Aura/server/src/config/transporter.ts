import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { env } from './env';

sgMail.setApiKey(env.sendgridApiKey);

export const transporter = {
  async sendMail(mailOptions: MailDataRequired): Promise<void> {
    try {
      await sgMail.send(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; 
    }
  },
};

export const verifyEmailTransporter = async (): Promise<void> => {
  try {
    console.log('✅ SendGrid transporter verified successfully.');
  } catch (error) {
    console.error('Error verifying email transporter:', error);
    throw error;
  }
};
