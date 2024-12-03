import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoByUserDto } from './create-photo-user.dto';

export class UpdatePhotoDto extends PartialType(CreatePhotoByUserDto ) {}
