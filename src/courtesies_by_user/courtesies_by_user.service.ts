import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourtesiesByUserDto } from './dto/create-courtesies_by_user.dto';
import { UpdateCourtesiesByUserDto } from './dto/update-courtesies_by_user.dto';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { UserActivceInterface } from 'src/auth/common/interfaces/user-active.interface';
import { courtesies_by_user } from './entities/courtesies_by_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CourtesiesByUserService {

  constructor(
    @InjectRepository(courtesies_by_user)
    private readonly cbuRepository: Repository<courtesies_by_user>,
    private readonly userService: UsersService
  ){}

  async create(createCourtesiesByUserDto: CreateCourtesiesByUserDto, @ActiveUser() user: any) {
    try {
      const activeUser = await this.userService.findOne(user); 
    const cbu = await this.cbuRepository.create({
      ...createCourtesiesByUserDto,
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
