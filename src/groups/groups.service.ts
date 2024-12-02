import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { groups } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsService } from '../admins/admins.service';
import { courtesies } from 'src/courtesies/entities/courtesy.entity';
import { courtesies_by_group } from 'src/courtesies_by_group/entities/courtesies_by_group.entity';
import { ActiveUser } from '../auth/common/decorators/active-user.decorator';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(groups)
    private readonly groupRepository: Repository<groups>,
    @InjectRepository(courtesies)
    private readonly courtesyRepository: Repository<courtesies>,
    @InjectRepository(courtesies_by_group)
    private readonly courtesiesByGroupRepository: Repository<courtesies_by_group>,
    private readonly adminService: AdminsService,
  ){}
    async create(createGroupDto: CreateGroupDto, @ActiveUser() user: any, courtesyNames: string[]) {
      //creacion y manejo de groupCode
      const MAX_RETRIES = 5;
      let retryCount = 0;
      while (retryCount < MAX_RETRIES) {
        try {
          const allGroups = await this.groupRepository.find({
              order: { groupCode: 'DESC' },
              take: 1,
            });
          const lastNumber = allGroups.length > 0
            ? parseInt(allGroups[0].groupCode.replace('GUP', ''))
            : 0;
          const nextNumber = lastNumber + 1;
          const groupCode = `GUP${nextNumber.toString().padStart(6, '0')}`;
          //asignacion automatica de un grupo con un admin
          const activeAdmin = await this.adminService.findOne(user);
          const group = this.groupRepository.create({
            ...createGroupDto,
            groupCode,
            admin: activeAdmin,
          });
          const savedGroup = await this.groupRepository.save(group); 
          //courtesies
          for (const courtesyName of courtesyNames) {
            let courtesy = await this.courtesyRepository.findOne({
              where: { name: courtesyName },
            });
          if (!courtesy) {
            courtesy = this.courtesyRepository.create({ name: courtesyName });
            courtesy = await this.courtesyRepository.save(courtesy);
          }
          const courtesiesByGroup = this.courtesiesByGroupRepository.create({
            group: savedGroup,
            courtesy,
          });
          await this.courtesiesByGroupRepository.save(courtesiesByGroup);
          }
          return savedGroup;
        } catch (error) {
            if (error.code === '23505') { 
              retryCount++;
              console.warn(`Reintento ${retryCount} por groupCode duplicado.`);
              continue;
            }
            throw error; 
          }
        }
      throw new InternalServerErrorException('No se pudo generar un código único después de varios intentos.');
    }

  findAll() {
    try{
      const cat = this.groupRepository.find();
      return cat;
    }catch(error){
      throw new InternalServerErrorException(error);
    }   
  }

  findOne(id: number) {
    const group = this.groupRepository.findOne({
      where: { id }
    });
    if (!group) {
      throw new InternalServerErrorException(`Element with id ${id} not found.`);
    }
    return group;
  }

  async findOneByGroupCode(groupCode: string) {
    const group = await this.groupRepository.findOne({
      where: { groupCode },
    });
    if (!group){
      throw new NotFoundException(`Element with id ${groupCode} not found.`); 
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


 
