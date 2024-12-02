import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contracts } from './entities/contract.entity';
import { UsersModule } from 'src/users/users.module';
import { payments } from 'src/payments/entities/payment.entity';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService],
  imports: [TypeOrmModule.forFeature([contracts, payments]), UsersModule],
  exports: [ContractsService]
})
export class ContractsModule {}
