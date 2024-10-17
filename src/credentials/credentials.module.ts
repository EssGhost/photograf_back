import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { credentials } from './entities/credential.entity';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService],
  imports: [TypeOrmModule.forFeature([credentials])],
  exports: [CredentialsService]
})
export class CredentialsModule {}
