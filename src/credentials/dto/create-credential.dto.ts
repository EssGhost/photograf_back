import { Transform, Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { users } from "src/users/entities/user.entity";

export class CreateCredentialDto {
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(3)
    username: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
    
    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    user: users;
}
