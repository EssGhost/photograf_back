import { Module } from '@nestjs/common';
import { CourtesiesByUserService } from './courtesies_by_user.service';
import { CourtesiesByUserController } from './courtesies_by_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { courtesies_by_user } from './entities/courtesies_by_user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CourtesiesByUserController],
  providers: [CourtesiesByUserService],
  imports: [TypeOrmModule.forFeature([courtesies_by_user]), UsersModule],
})
export class CourtesiesByUserModule {}
