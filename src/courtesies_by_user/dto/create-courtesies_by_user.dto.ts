import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";
import { courtesies_by_group } from "src/courtesies_by_group/entities/courtesies_by_group.entity";
import { users } from "src/users/entities/user.entity";

export class CreateCourtesiesByUserDto {
    // @IsNumber()
    // @IsPositive()
    // @Type(() => users )
    // user: users;
    
    @IsNumber()
    @IsPositive()
    @Type(() => courtesies_by_group )
    courtesy_by_group: courtesies_by_group;
}
