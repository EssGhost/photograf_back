import { Module } from '@nestjs/common';
import { CourtesiesService } from './courtesies.service';
import { CourtesiesController } from './courtesies.controller';

@Module({
  controllers: [CourtesiesController],
  providers: [CourtesiesService],
})
export class CourtesiesModule {}
