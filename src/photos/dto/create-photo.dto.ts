import { Transform, Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { groups } from "src/groups/entities/group.entity";

export class CreatePhotoDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    photo: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    group: groups;
}
