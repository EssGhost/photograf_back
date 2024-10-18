import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCourtesyDto { 
@MinLength(3)
@IsString()
name: string;
}
