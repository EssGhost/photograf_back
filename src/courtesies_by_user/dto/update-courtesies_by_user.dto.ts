import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtesiesByUserDto } from './create-courtesies_by_user.dto';

export class UpdateCourtesiesByUserDto extends PartialType(CreateCourtesiesByUserDto) {}
