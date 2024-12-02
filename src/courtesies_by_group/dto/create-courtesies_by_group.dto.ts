import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";
import { courtesies } from "src/courtesies/entities/courtesy.entity";
import { groups } from "src/groups/entities/group.entity";

export class CreateCourtesiesByGroupDto {
    @IsNumber()
    @IsPositive()
    @Type(() => groups )
    group: groups;
    
    @IsNumber()
    @IsPositive()
    @Type(() => courtesies )
    courtesie: courtesies;
}
