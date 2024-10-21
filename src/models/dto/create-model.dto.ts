import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateModelDto { 
@MinLength(3)
@IsString()
name: string;

@MinLength(2)
@IsString()
color: string;
}
