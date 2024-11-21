import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { courtesies_by_group } from "../../courtesies_by_group/entities/courtesies_by_group.entity";

export class CreateCourtesyDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id?: number; // Para asociar cortesías existentes

    @IsOptional()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    @IsString()
    name?: string; // Para crear nuevas cortesías
    
    // @IsString()
    // @Transform(({value}) => value.trim())
    // @MinLength(3)
    // name: string;
    
    // @IsNumber()
    // @IsPositive()
    // @Type(() => courtesies_by_group)
    // courtesie_by_group: courtesies_by_group[];
}
