import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtesyDto } from './create-courtesy.dto';

export class UpdateCourtesyDto extends PartialType(CreateCourtesyDto) {}
