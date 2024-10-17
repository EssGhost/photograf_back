import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";
import { courtesies_by_group } from "src/courtesies_by_group/entities/courtesies_by_group.entity";
import { users } from "src/users/entities/user.entity";


export class CreateCourtesiesByUserDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    user: users;
    
    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    cbg: courtesies_by_group;
}
