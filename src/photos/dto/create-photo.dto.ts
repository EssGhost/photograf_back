import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePhotoDto {
 
    @IsString()
    @MinLength(2)
    name: string;

    @IsArray()
    @IsOptional()
    image_urls?: string[];

    @IsNotEmpty()
    @Type(() => Number) // Transformar a número
    @IsNumber()
    groupId: number;

    @IsNotEmpty()
    @Type(() => Number) // Transformar a número
    @IsNumber()
    userId: number;
}
