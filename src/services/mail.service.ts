import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER_ID,
        pass: process.env.EMAIL_USER_PASSWORD,
      },
    });
  }

  async sendForgotPasswordEmail(email: string, token: string): Promise<void> {
    const resetPasswordUrl = `${process.env.FRONTEND_URL}${process.env.RESET_PASSWORD_URL}?token=${token}`;
  
    const mailOptions = {
      from: process.env.EMAIL_USER_ID,
      to: email,
      subject: 'Forgot Password',
      text: `Reset password URL: ${resetPasswordUrl}`,
      html: `Click <a href="${resetPasswordUrl}">here</a> to reset your password.`,
    };
  
    await this.transporter.sendMail(mailOptions);
  }
  
}
