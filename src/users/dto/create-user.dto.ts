import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsPositive, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    lastname1: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    lastname2: string;
    
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(10)
    phone: string;

    @IsBoolean()
    tag: boolean;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    instagram: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    facebook: string;

    @Transform(({ value }) => value.trim())
    @Transform(({ value }) => parseFloat(value))
    @MinLength(0)
    @IsPositive()
    toga: number;

    //status: boolean;
}
