import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtesiesByGroupDto } from './create-courtesies_by_group.dto';

export class UpdateCourtesiesByGroupDto extends PartialType(CreateCourtesiesByGroupDto) {}
