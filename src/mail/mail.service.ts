import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

//import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
    // Configuración del transporter de Nodemailer
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña de correo (o una contraseña de aplicación si usas Gmail)
      },
    });
    }

  // Función para enviar un correo
  async sendMail(mailOptions: { to: string; subject: string; text: string }) {
    try {
      const info = await this.transporter.sendMail({
        from: '"No Reply" <yolotlperez8@gmail.com>', // Dirección de correo del remitente
        to: mailOptions.to, // Dirección de destino
        subject: mailOptions.subject, // Asunto
        text: mailOptions.text, // Cuerpo del mensaje
      });

      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
