import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourtesiesByGroupDto } from './dto/create-courtesies_by_group.dto';
import { UpdateCourtesiesByGroupDto } from './dto/update-courtesies_by_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { courtesies_by_group } from './entities/courtesies_by_group.entity';
import { Repository } from 'typeorm';
import { users } from 'src/users/entities/user.entity';

@Injectable()
export class CourtesiesByGroupService {
  constructor(
    @InjectRepository(courtesies_by_group)
    private readonly cbgRepository: Repository<courtesies_by_group>,
    @InjectRepository(users)
    private readonly userRepository: Repository<users>
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
  
  async findByGroupByActiveUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['group'], // Asegúrate de tener la relación configurada
    });
  
    if (!user || !user.group) {
      throw new InternalServerErrorException(`User with id ${userId} is not associated with any group.`);
    }
  
    const groupId = user.group.id;
  
    // Buscar las cortesías asociadas al grupo
    const cbg = await this.cbgRepository.find({
      where: { group: { id: groupId } },
      relations: ['courtesy'], // Asegúrate de incluir la relación con `courtesy`
      select: {
        courtesy: { name: true }, // Solo queremos el nombre de las cortesías
      },
    });
  
    if (!cbg.length) {
      throw new InternalServerErrorException(`No elements found for group id ${groupId}.`);
    }
  
    return cbg.map(entry => entry.courtesy.name); // Retorna solo los nombres de las cortesías
  }


  update(id: number, updateCourtesiesByGroupDto: UpdateCourtesiesByGroupDto) {
    return `This action updates a #${id} courtesiesByGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} courtesiesByGroup`;
  }
}
