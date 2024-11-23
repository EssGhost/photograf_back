import { Transform } from "class-transformer";
import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min, MinLength } from "class-validator";

export class CreateContractDto {
    // Transformación para eliminar espacios en blanco y validación de tipo y longitud mínima
    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(3)
    placa: string;

    // Validación booleana para todas las propiedades que son de tipo booleano
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

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(3)
    specification: string;

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(3)
    txt1: string;

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(2)
    dedicated1: string;

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(3)
    txt2: string;

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(2)
    dedicated2: string;

    // Validación booleana
    @IsBoolean()
    status: boolean;

    @IsNumber()
    cost: number; // Nota: Puede requerir recibir el valor como string

    @IsNotEmpty()
    @IsNumber()
    userId: number; // Si necesitas asociar el usuario

}
