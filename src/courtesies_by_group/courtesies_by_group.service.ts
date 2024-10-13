import { Injectable } from '@nestjs/common';
import { CreateCourtesiesByGroupDto } from './dto/create-courtesies_by_group.dto';
import { UpdateCourtesiesByGroupDto } from './dto/update-courtesies_by_group.dto';

@Injectable()
export class CourtesiesByGroupService {
  create(createCourtesiesByGroupDto: CreateCourtesiesByGroupDto) {
    return 'This action adds a new courtesiesByGroup';
  }

  findAll() {
    return `This action returns all courtesiesByGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courtesiesByGroup`;
  }

  update(id: number, updateCourtesiesByGroupDto: UpdateCourtesiesByGroupDto) {
    return `This action updates a #${id} courtesiesByGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} courtesiesByGroup`;
  }
}
