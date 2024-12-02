import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { AdminsModule } from 'src/admins/admins.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { ContractsModule } from 'src/contracts/contracts.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants/jwt.constant';
import { GroupsModule } from 'src/groups/groups.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports : [
    UsersModule, 
    AdminsModule, 
    CredentialsModule, 
    ContractsModule, 
    GroupsModule,
    MailModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret, // Cambia por tu clave secreta
      signOptions: { expiresIn: '15d' }, // Duración del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
