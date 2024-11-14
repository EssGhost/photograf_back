import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateModelDto { 
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    color: string;
}
