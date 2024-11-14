import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";


import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateModelDto { 
@MinLength(3)
@IsString()
name: string;

@MinLength(2)
@IsString()
color: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    color: string;
}
