import { IsEnum } from 'class-validator';
import { PaymentState } from '../payment-state.enum';

export class UpdatePaymentStatusDto {
  @IsEnum(PaymentState, { message: 'Estado de pago no válido' })
  state: PaymentState;
}