import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports : [UsersModule, AdminsModule ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
