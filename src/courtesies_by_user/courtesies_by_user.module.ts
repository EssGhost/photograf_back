import { Module } from '@nestjs/common';
import { CourtesiesByUserService } from './courtesies_by_user.service';
import { CourtesiesByUserController } from './courtesies_by_user.controller';

@Module({
  controllers: [CourtesiesByUserController],
  providers: [CourtesiesByUserService],
})
export class CourtesiesByUserModule {}
