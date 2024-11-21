import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateCourtesyDto } from "../../courtesies/dto/create-courtesy.dto";

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

    @IsString()
    @IsNotEmpty()
    courtesyName: string; 

    // @IsOptional()
    // @IsNumber()
    // @IsPositive()
    // @Type(() => Number )
    // admin: admins;
}
