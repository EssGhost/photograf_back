import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourtesiesByGroupDto } from './dto/create-courtesies_by_group.dto';
import { UpdateCourtesiesByGroupDto } from './dto/update-courtesies_by_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { courtesies_by_group } from './entities/courtesies_by_group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourtesiesByGroupService {
  constructor(
    @InjectRepository(courtesies_by_group)
    private readonly cbgRepository: Repository<courtesies_by_group>
  ){}

  async create(createCourtesiesByGroupDto: CreateCourtesiesByGroupDto) {
    // try {
    //   const cbg = await this.cbgRepository.create(createCourtesiesByGroupDto);
    //   await this.cbgRepository.save(cbg);
    //   return cbg;
    // } catch (error) {
    //   throw new InternalServerErrorException(error)
    // }
  }

  findAll() {
    return `This action returns all courtesiesByGroup`;
  }

  async findOne(id: number) {
    const cbg = await this.cbgRepository.findOne({
      where: { id }
    });
    if (!cbg) {
      throw new InternalServerErrorException(`Element with id ${id} not found.`);
    }
    return cbg;
  }


  update(id: number, updateCourtesiesByGroupDto: UpdateCourtesiesByGroupDto) {
    return `This action updates a #${id} courtesiesByGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} courtesiesByGroup`;
  }
}
