import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';



@Injectable()
export class MailerService {
  private CLIENT_ID = process.env.GMAIL_CLIENT_ID;
  private CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
  private REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
  private REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
  private transporter;

  constructor() {
    this.createTransporter().catch((error) => console.log(error));
  }

  async sendMessage(to: string, subject: string, message: string) {
    try {
      await this.transporter.sendMail({
        from: '"ABC IT team" <abcit@gmail.com>',
        to: to,
        subject: subject,
        html: message,
      });

      console.log('Message sent: %s', to);
    } catch (e) {
      console.log(`Error at ${e}`);
    }
  }

  async retrieveToken() {
    const oAuth2Client = new google.auth.OAuth2(
      this.CLIENT_ID,
      this.CLIENT_SECRET,
      this.REDIRECT_URI,
    );
    oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });
    return await oAuth2Client.getAccessToken();
  }

  async createTransporter() {
    const accessToken = await this.retrieveToken();
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mahkamovabubakir65119@gmail.com',
        clientId: this.CLIENT_ID,
        clientSecret: this.CLIENT_SECRET,
        refreshToken: this.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  }
}
