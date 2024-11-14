import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { models } from "src/models/entities/model.entity";
import { users } from "src/users/entities/user.entity";

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

    // @IsBoolean()
    // status: boolean;

    // @IsNumber()
    // @IsPositive()
    // @Type(() => users )
    // user: users;
    
    // @IsNumber()
    // @IsPositive()
    // @Type(() => models )
    // model: models;
}
