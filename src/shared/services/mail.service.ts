import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import "dotenv/config"


@Injectable()
export class MailService {
    
    async sendMail(mail: string, tag: string, subject: string): Promise<void> {
    const {env} = process
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: env.EMAIL,
        pass: env.PASS,
      },
    });

    const mailOptions = {
      from: 'Sello.uz',
      to: mail,
      port: 465,
      secure: true,
      subject: subject,
      html: tag,
      text: 'Secure confirm your email',
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log('Error:', err);
    }
  }
}