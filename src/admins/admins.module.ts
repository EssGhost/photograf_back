import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admins } from './entities/admin.entity';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [TypeOrmModule.forFeature([admins])],
})
export class AdminsModule {}
