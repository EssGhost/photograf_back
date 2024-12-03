import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpException,
  HttpStatus,
  Options,
  BadRequestException,
  Query,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
  Request,
  Req
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { StripeService } from '../stripe/stripe.service';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentState } from './payment-state.enum';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/auth/common/enums/role.enum';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly stripe: StripeService,
    private readonly paymentsService: PaymentsService
  ) {}

  @Post('create-payment-intent')
  @Auth(Role.USER)
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      // Asumiendo que getContractById ahora acepta también userId
      const contract = await this.paymentsService.getContractById(
        createPaymentDto.contractId,
        createPaymentDto.userId
      );
  
      if (!contract) {
        throw new HttpException('Contract not found', HttpStatus.NOT_FOUND);
      }
  
      if (contract.cost <= 0) {
        throw new HttpException('Cost must be greater than 0', HttpStatus.BAD_REQUEST);
      }
  
      const paymentIntent = await this.stripe.createPaymentIntent(
        Math.round(contract.cost * 100),
        'mxn'
      );
  
      return { 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Error al crear el PaymentIntent:', error);
  
      if (error instanceof HttpException) {
        throw error;
      }
  
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error al crear el payment intent',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Options('create-payment-intent')
  preflightPaymentIntent() {
    return;
  }

  @Post('confirm')
  async confirmPayment(@Body() confirmDto: ConfirmPaymentDto) {
    try {
      const existingPaymentIntent = await this.stripe.retrievePaymentIntent(confirmDto.paymentIntentId);
  
      if (existingPaymentIntent.status === 'succeeded') {
        return {
          status: 'success',
          paymentIntentId: existingPaymentIntent.id,
          message: 'El PaymentIntent ya fue confirmado y se encuentra en estado "succeeded". No es necesaria otra confirmación.',
        };
      }
  
      const paymentIntent = await this.stripe.confirmPaymentIntent(confirmDto.paymentIntentId);
  
      if (paymentIntent.status === 'succeeded') {
        return {
          status: 'Realizado',
          paymentIntentId: paymentIntent.id,
          message: 'Payment confirmed successfully',
        };
      }
  
      throw new HttpException(
        'Payment confirmation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      console.error('Error al confirmar el PaymentIntent:', error);
  
      if (error instanceof HttpException) {
        throw error;
      }
  
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al confirmar el PaymentIntent',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.paymentsService.findAll();
  }
  
  @Get('has-paid/:userId')
  async hasUserPaid(@Param('userId') userId: number) {
    try {
      const hasPaid = await this.paymentsService.hasUserPaid(userId);
      return { hasPaid };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al verificar el pago del usuario',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
  @Patch('update-status/:id')
async updateStatus(
  @Param('id') paymentId: number,
  @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
) {
  const { state } = updatePaymentStatusDto;
  await this.paymentsService.updatePaymentStatus(paymentId, state);
}


  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const payment = await this.paymentsService.findOne(+id);
      
      // Si el pago existe y tiene un contrato asociado, incluye el costo
      if (payment && payment.contract) {
        return {
          ...payment,
          cost: payment.contract.cost
        };
      }
      
      return payment;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Pago no encontrado',
          details: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('/code/:paymentId')
  async getPaymentDetails(@Param('paymentId') paymentId: number) {
    const paymentDetails = await this.paymentsService.getPaymentDetails(paymentId);

    if (!paymentDetails) {
      throw new NotFoundException('No se encontró información del pago.');
    }

    return { clientSecret: paymentDetails.clientSecret, paymentDetails };
  }

  @Get('/findByUser')
  @Auth(Role.ADMIN)
  async getPaymentsByUser(@Query('userId') userId: number) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.paymentsService.findByUser(userId);
  }

  @Get('/findByyActiveUser')
  @Auth(Role.USER)
  async getMyPayments(@Req() req) {
  const userId = req.user.id; // Este valor proviene del JWT

  return this.paymentsService.findByActiveUser(userId);
}

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updatePaymentDto: UpdatePaymentDto
  ) {
    try {
      return await this.paymentsService.update(+id, updatePaymentDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error al actualizar el pago',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.paymentsService.remove(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error al eliminar el pago',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('create')
  @Auth(Role.USER)
  async createPayment(@Request() req) {
    const userId = req.user.id;
    // Crear el pago
    const payment = await this.paymentsService.createPaymentForContract(userId);
    
    // Devolver el clientSecret junto con otros detalles del pago
    return { clientSecret: payment.clientSecret, paymentDetails: payment };
  }
}