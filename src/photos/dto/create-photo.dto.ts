import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePhotoDto {

    @MinLength(3)
    @IsString()
    name: string;

    @IsArray()
    @IsOptional()
    image_urls?: string[];
}
