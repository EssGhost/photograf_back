import { Module } from '@nestjs/common';
import { CourtesiesByGroupService } from './courtesies_by_group.service';
import { CourtesiesByGroupController } from './courtesies_by_group.controller';

@Module({
  controllers: [CourtesiesByGroupController],
  providers: [CourtesiesByGroupService],
})
export class CourtesiesByGroupModule {}
