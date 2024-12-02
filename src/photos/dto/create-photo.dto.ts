
import { IsNumber, IsPositive, IsString, MinLength, IsArray, IsOptional, } from "class-validator";
import { Transform, Type } from "class-transformer";
import { groups } from "src/groups/entities/group.entity";

export class CreatePhotoDto {
 
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(2)
    name: string;

    @IsArray()
    @IsOptional()
    image_urls?: string[];

    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    group: groups;
}
