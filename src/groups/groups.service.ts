import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { groups } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(groups)
    private readonly groupRepository: Repository<groups>
  ){}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const lastGroup = await this.groupRepository.findOne({
        order: { groupCode: 'DESC' },
      });
      const lastNumber = lastGroup ? parseInt(lastGroup.groupCode.replace('GUP', '')) : 0;
      const nextNumber = lastNumber + 1;
      const groupCode = `GUP${nextNumber.toString().padStart(6, '0')}`;

      const group = this.groupRepository.create({
        ...createGroupDto,
        groupCode,
      });

      await this.groupRepository.save(group);
      return group;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all groups`;
  }

  async findOne(id: number, groupCode: string) {
    const group = await this.groupRepository.findOne({
      where: { id, groupCode },
    });
    if (!group){
      throw new NotFoundException(`Element with id ${id} not found.`); 
    }
    return group;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
