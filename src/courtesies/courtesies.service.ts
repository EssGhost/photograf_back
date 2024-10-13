import { Injectable } from '@nestjs/common';
import { CreateCourtesyDto } from './dto/create-courtesy.dto';
import { UpdateCourtesyDto } from './dto/update-courtesy.dto';

@Injectable()
export class CourtesiesService {
  create(createCourtesyDto: CreateCourtesyDto) {
    return 'This action adds a new courtesy';
  }

  findAll() {
    return `This action returns all courtesies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courtesy`;
  }

  update(id: number, updateCourtesyDto: UpdateCourtesyDto) {
    return `This action updates a #${id} courtesy`;
  }

  remove(id: number) {
    return `This action removes a #${id} courtesy`;
  }
}
