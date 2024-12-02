import { Module } from '@nestjs/common';
import { MailService } from './mail.service'; // Asegúrate de importar correctamente

@Module({
  providers: [MailService], // El servicio debe estar en `providers`
  exports: [MailService],   // Si quieres usarlo en otros módulos, puedes exportarlo
})
export class MailModule {}
