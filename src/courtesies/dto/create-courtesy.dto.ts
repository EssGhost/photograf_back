import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateCourtesyDto {
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    name: string;
}
