import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { groups } from './entities/group.entity';
import { AdminsModule } from 'src/admins/admins.module';
import { courtesies } from 'src/courtesies/entities/courtesy.entity';
import { courtesies_by_group } from 'src/courtesies_by_group/entities/courtesies_by_group.entity';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [TypeOrmModule.forFeature([groups, courtesies, courtesies_by_group]), AdminsModule, ],
  exports: [GroupsService]
})
export class GroupsModule {}
