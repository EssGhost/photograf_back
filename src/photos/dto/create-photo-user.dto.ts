
import { IsNumber, IsPositive, IsString, MinLength, IsArray, IsOptional, IsNotEmpty, } from "class-validator";
import { Transform, Type } from "class-transformer";
import { groups } from "src/groups/entities/group.entity";

export class CreatePhotoByUserDto  {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(2)
    name: string;

    @IsArray()
    @IsOptional()
    image_urls?: string[];

    // @IsNotEmpty()
    // @Type(() => Number) // Transformar a número
    // @IsNumber()
    // groupId: number;

    @IsNotEmpty()
    @Type(() => Number) // Transformar a número
    @IsNumber()
    userId: number;
}
