import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    name: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    lastname1: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    lastname2: string;

    @IsEmail()
    email: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    username: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;

    @IsNumber()
    @IsPositive()
    sucursal: number;
}
