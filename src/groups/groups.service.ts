import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { groups } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(groups)
    private readonly groupRepo: Repository<groups>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  findAll() {
    return `This action returns all groups`;
  }
  async findOne(id: number): Promise<groups> {
    const group = await this.groupRepo.findOne({
      where: { id },
      select: ['id', 'name'],
    });

    if (!group) {
      throw new HttpException(`Group with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return group;
  }
  update(id : number, UpdateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}


 
