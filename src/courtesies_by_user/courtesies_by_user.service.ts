import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourtesiesByUserDto } from './dto/create-courtesies_by_user.dto';
import { UpdateCourtesiesByUserDto } from './dto/update-courtesies_by_user.dto';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { courtesies_by_user } from './entities/courtesies_by_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CourtesiesByGroupService } from '../courtesies_by_group/courtesies_by_group.service';
import { courtesies_by_group } from 'src/courtesies_by_group/entities/courtesies_by_group.entity';

@Injectable()
export class CourtesiesByUserService {

  constructor(
    @InjectRepository(courtesies_by_user)
    private readonly cbuRepository: Repository<courtesies_by_user>,
    @InjectRepository(courtesies_by_group)
    private readonly cbgRepository: Repository<courtesies_by_group>,
    private readonly userService: UsersService,
  ){}

  async create(createCourtesiesByUserDto: CreateCourtesiesByUserDto, @ActiveUser() user: any) {
    try {
      const activeUser = await this.userService.findOne(user); 
      const courtesyByGroup = await this.cbgRepository.findOne({
        where: { id: createCourtesiesByUserDto.courtesy_by_group },
      });
  
      if (!courtesyByGroup) {
        throw new NotFoundException(
          `Courtesy by group with ID ${createCourtesiesByUserDto.courtesy_by_group} not found`
        );
      }
      const cbu = await this.cbuRepository.create({
      courtesy_by_group: courtesyByGroup,
      user: activeUser
    })
    await this.cbuRepository.save(cbu);
    return cbu;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
