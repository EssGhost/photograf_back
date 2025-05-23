import { Module } from '@nestjs/common';
import { CourtesiesByGroupService } from './courtesies_by_group.service';
import { CourtesiesByGroupController } from './courtesies_by_group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { courtesies_by_group } from './entities/courtesies_by_group.entity';
import { users } from '../users/entities/user.entity';

@Module({
  controllers: [CourtesiesByGroupController],
  providers: [CourtesiesByGroupService],
  imports: [TypeOrmModule.forFeature([courtesies_by_group, users])],
})
export class CourtesiesByGroupModule {}
