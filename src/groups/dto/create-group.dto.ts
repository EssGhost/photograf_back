import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { admins } from "src/admins/entities/admin.entity";

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

    @IsDate()
    entrega: Date;

    @IsBoolean()
    status: boolean;

    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    admin: admins;
}
