import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto { 
    @IsNotEmpty()
    @IsNumber()
    contractId: number; // ID del contrato del cual se deriva el costo

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
