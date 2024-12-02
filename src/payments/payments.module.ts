import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { payments } from './entities/payment.entity';
import { UsersModule } from 'src/users/users.module';
import { users } from 'src/users/entities/user.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { contracts } from 'src/contracts/entities/contract.entity';
import { ContractsModule } from 'src/contracts/contracts.module';

@Module({
  imports: [TypeOrmModule.forFeature([payments, users,contracts,]),
UsersModule, StripeModule, ContractsModule
],

  controllers: [PaymentsController],
  
  providers: [PaymentsService],
  
})
export class PaymentsModule {}
