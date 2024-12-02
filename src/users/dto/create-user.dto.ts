import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { contracts } from "src/contracts/entities/contract.entity";
import { credentials } from "src/credentials/entities/credential.entity";
import { groups } from "src/groups/entities/group.entity";

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
    //@Transform(({ value }) => parseFloat(value))
    @MinLength(0)
    //@IsPositive()
    toga: number;

    // @IsNumber()
    // @IsPositive()
    // @Type(() => groups )
    // group: groups;
    @IsString()
    @IsNotEmpty()
    group: string;
    // @IsBoolean()
    // status: boolean;

    // @IsNumber()
    // @IsPositive()
    // @Type(() => Number )
    // contract: contracts;

    // @IsNumber()
    // @IsPositive()
    // @Type(() => Number )
    // credential: credentials;
}
