import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsPositive, IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min, MinLength } from "class-validator";
import { models } from "src/models/entities/model.entity";

export class CreateContractDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    placa: string;

    @IsBoolean()
    panoramica: boolean;

    @IsBoolean()
    ampliacion: boolean;

    @IsBoolean()
    agradecimiento: boolean;

    @IsBoolean()
    individual: boolean;

    @IsBoolean()
    diploma: boolean;

    @IsBoolean()
    convencional: boolean;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    specification: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    txt1: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(2)
    dedicated1: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    txt2: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(2)
    dedicated2: string;

    @IsNumber()
    @IsPositive()
    @Type(()=>models)
    model: models

    @IsNumber()
    cost: number; // Nota: Puede requerir recibir el valor como string

    @IsNotEmpty()
    @IsNumber()
    userId: number; // Si necesitas asociar el usuario

}
