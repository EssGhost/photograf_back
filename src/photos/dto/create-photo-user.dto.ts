
import { IsNumber, IsString, MinLength, IsOptional, IsNotEmpty, } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreatePhotoByUserDto  {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @IsOptional()
    image_urls?: string;

    // @IsNotEmpty()
    // @Type(() => Number) // Transformar a número
    // @IsNumber()
    // groupId: number;

    @IsNotEmpty()
    @Type(() => Number) // Transformar a número
    @IsNumber()
    userId: number;
}
