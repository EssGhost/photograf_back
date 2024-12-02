import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    name: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    carrera: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    generacion: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    graduacion: string;

    @Type(() => Date)
    @IsDate()
    entrega: Date;

    @IsArray()
    courtesyNames?: string[]; 

    // @IsOptional()
    // @IsNumber()
    // @IsPositive()
    // @Type(() => Number )
    // admin: admins;
}
