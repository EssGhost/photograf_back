import { Module } from '@nestjs/common';
import { CourtesiesService } from './courtesies.service';
import { CourtesiesController } from './courtesies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { courtesies } from './entities/courtesy.entity';

@Module({
  controllers: [CourtesiesController],
  providers: [CourtesiesService],
  imports: [TypeOrmModule.forFeature([courtesies])],
})
export class CourtesiesModule {}
