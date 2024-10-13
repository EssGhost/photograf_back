import { Injectable } from '@nestjs/common';
import { CreateCourtesiesByUserDto } from './dto/create-courtesies_by_user.dto';
import { UpdateCourtesiesByUserDto } from './dto/update-courtesies_by_user.dto';

@Injectable()
export class CourtesiesByUserService {
  create(createCourtesiesByUserDto: CreateCourtesiesByUserDto) {
    return 'This action adds a new courtesiesByUser';
  }

  findAll() {
    return `This action returns all courtesiesByUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courtesiesByUser`;
  }

  update(id: number, updateCourtesiesByUserDto: UpdateCourtesiesByUserDto) {
    return `This action updates a #${id} courtesiesByUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} courtesiesByUser`;
  }
}
