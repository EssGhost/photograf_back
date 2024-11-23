// payments.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { payments } from './entities/payment.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { users } from 'src/users/entities/user.entity';
import Stripe from 'stripe';
import { contracts } from 'src/contracts/entities/contract.entity';
import { PaymentState } from './payment-state.enum';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(payments)
    private readonly paymentsRepository: Repository<payments>,
    @InjectRepository(users)
    private readonly userRepository: Repository<users>,
    @InjectRepository(contracts)
    private readonly contractsRepository: Repository<contracts>,
  ) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY must be defined in environment variables');
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-10-28.acacia',
    });
  }


  async getPaymentDetails(paymentId: number) {
    // Buscar el pago en la base de datos
    const payment = await this.paymentsRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      return null;  // No se encontró el pago
    }

    return payment;  // Devolver los detalles del pago
  }

  public async getContractById(contractId: number, userId: number): Promise<contracts> {
    const payment = await this.paymentsRepository.findOne({
        where: {
            contract: { id: contractId }, 
            user: { id: userId },       
        },
        relations: ['contract', 'user'], 
    });

    if (!payment) {
        throw new NotFoundException(`Contract with ID ${contractId} not found for the user.`);
    }

    // Retorna el contrato relacionado con el pago
    return payment.contract;
}

async createPaymentRecord(stripeResponse: Stripe.PaymentIntent, contractId: number) {
  try {
    const contract = await this.contractsRepository.findOne({
      where: { id: contractId },
      relations: ['user'],
    });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    // Mapea el estado de Stripe a los estados internos
    const mappedState =
  stripeResponse.status === 'succeeded'
    ? PaymentState.REALIZADO
    : PaymentState.PENDIENTE;


    const newPayment = new payments();
    newPayment.state = mappedState; // Usa el estado mapeado
    newPayment.method = 'stripe';
    newPayment.pay_date =
      mappedState === 'Realizado' ? new Date(stripeResponse.created * 1000) : null;
    newPayment.external_transaction_id = stripeResponse.id;
    newPayment.contract = contract;
    newPayment.user = contract.user;

    return await this.paymentsRepository.save(newPayment);
  } catch (error) {
    throw new BadRequestException('Error creating payment record: ' + error.message);
  }
}

  async createPaymentIntent(contractId: number, userId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const contract = await this.contractsRepository.findOne({
        where: { id: contractId }
      });
      
      if (!contract) {
        throw new NotFoundException(`Contract with ID ${contractId} not found`);
      }

      const amount = contract.cost;

      if (amount <= 0) {
        throw new BadRequestException('Amount must be greater than 0');
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'mxn',
        payment_method_types: ['card'],
        metadata: {
          userId: userId.toString(),
          contractId: contractId.toString(),
        },
      });

      const newPayment = new payments();
      newPayment.state = PaymentState.REALIZADO;
      newPayment.method = 'stripe';
      newPayment.pay_date = new Date();
      newPayment.external_transaction_id = paymentIntent.id;
      newPayment.contract = contract;
      newPayment.user = user;

      const savedPayment = await this.paymentsRepository.save(newPayment);

      return {
        clientSecret: paymentIntent.client_secret,
        paymentId: savedPayment.id,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error creating payment intent: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.paymentsRepository.findOne({
        where: { id },
        relations: ['user', 'contract']
      });
      
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return payment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error fetching payment: ' + error.message);
    }
  }

  async hasUserPaid(userId: number): Promise<boolean> {
    try {
      const payment = await this.paymentsRepository.findOne({
        where: {
          user: { id: userId },
          state: PaymentState.REALIZADO,
        },
        order: {
          pay_date: 'DESC',
        },
      });
      return !!payment;
    } catch (error) {
      throw new BadRequestException('Error checking payment status: ' + error.message);
    }
  }

  async updatePaymentStatus(paymentId: number, newState: PaymentState): Promise<void> {
    if (!Object.values(PaymentState).includes(newState)) {
      throw new BadRequestException('Estado de pago no válido');
    }
  
    const result = await this.paymentsRepository.update(paymentId, {
      state: newState,
      pay_date: newState === PaymentState.REALIZADO ? new Date() : null,
    });
  
    if (result.affected === 0) {
      throw new NotFoundException('Pago no encontrado');
    }
  }
  
  async findAll() {
    try {
      return await this.paymentsRepository.find({
        relations: ['user', 'contract'],
        order: { pay_date: 'DESC' },
      });
    } catch (error) {
      throw new BadRequestException('Error fetching payments: ' + error.message);
    }
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = await this.findOne(id);
      Object.assign(payment, updatePaymentDto);
      return await this.paymentsRepository.save(payment);
    } catch (error) {
      throw new BadRequestException('Error updating payment: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      const payment = await this.findOne(id);
      return await this.paymentsRepository.remove(payment);
    } catch (error) {
      throw new BadRequestException('Error removing payment: ' + error.message);
    }
  }

  async findAllByUser(userId: number) {
    try {
      const payments = await this.paymentsRepository.find({
        where: { user: { id: userId } },
        relations: ['contract'],
        order: { pay_date: 'DESC' },
      });
  
      return payments.map(payment => ({
        id: payment.id,
        state: payment.state,
        cost: payment.contract.cost,
        method: payment.method,
        pay_date: payment.pay_date,
      }));
    } catch (error) {
      throw new BadRequestException('Error fetching payments: ' + error.message);
    }
  }

  async findPaymentById(id: number) {
    return await this.paymentsRepository.findOne({
        where: { id },
        relations: ['user', 'contract'], // Incluye relaciones si es necesario
    });
}


 // Crear un pago pendiente para un contrato
 async createPaymentForContract(contractId: number, userId: number) {
  // Buscar el contrato por su ID
  const contract = await this.contractsRepository.findOne({
    where: { id: contractId },
    relations: ['user'],
  });

  if (!contract) {
    throw new Error('Contrato no encontrado');
  }
  const user = contract.user; // Obtener el usuario directamente del contrato

  const amount = contract.cost;

  if (amount <= 0) {
    throw new BadRequestException('Amount must be greater than 0');
  }

  const paymentIntent = await this.stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'mxn',
    payment_method_types: ['card'],
    description: `Pago del contrato ${contractId}`,
  });

  // Crear el pago en la base de datos
  const Payment = new payments();
  Payment.state = PaymentState.PENDIENTE;
  Payment.method = 'stripe';
  Payment.pay_date = new Date();
  Payment.external_transaction_id = paymentIntent.id;
  Payment.contract = contract;
  Payment.user = user; // Asociar el usuario al pago
  Payment.clientSecret = paymentIntent.client_secret; // Guardar el clientSecret generado por Stripe

  // Guardar el pago en la base de datos
  await this.paymentsRepository.save(Payment);

  return Payment;
}

}