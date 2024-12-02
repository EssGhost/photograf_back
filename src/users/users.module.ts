import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/user.entity';
import { UsersController } from './users.controller'; 
import { UsersService } from './users.service';
import { groups } from '../groups/entities/group.entity';
import { courtesies_by_user } from '../courtesies_by_user/entities/courtesies_by_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([users, groups, courtesies_by_user])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
