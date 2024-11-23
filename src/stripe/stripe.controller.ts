import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentDto: { amount: number, currency: string }) {
    const stripe = this.stripeService.getStripeInstance();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      payment_method_types: ['card'], // tipos de método de pago
    });
    return { clientSecret: paymentIntent.client_secret };
  }

  
}
