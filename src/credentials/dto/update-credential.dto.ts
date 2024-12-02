import { PartialType } from '@nestjs/mapped-types';
import { CreateCredentialDto } from './create-credential.dto';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class UpdateCredentialDto extends PartialType(CreateCredentialDto) {
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}
