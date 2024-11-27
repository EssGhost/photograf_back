import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { groups } from '../groups/entities/group.entity';
import { courtesies_by_user } from '../courtesies_by_user/entities/courtesies_by_user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(users)
    private readonly userRepository: Repository<users>,
    @InjectRepository(groups)
    private readonly groupRepository: Repository<groups>,
    @InjectRepository(courtesies_by_user)
    private readonly courtesiesByUserRepository: Repository<courtesies_by_user>
  ) {}

  generateRandomPassword(): string {
    const password = randomBytes(5).toString('hex');
    console.log(password);
    return password;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const groupEntity = await this.groupRepository.findOne({
        where: { groupCode: createUserDto.group },
        relations: ['courtesy_by_group', 'courtesy_by_group.courtesy'],
      });
      if (!groupEntity) {
        throw new BadRequestException(`Group with code ${createUserDto.group} not found`);
      }
  
      // Verificar si hay cortesías asociadas al grupo
      if (!groupEntity.courtesy_by_group || groupEntity.courtesy_by_group.length === 0) {
        throw new BadRequestException(`No courtesies found for group ${createUserDto.group}`);
      }

      const user = this.userRepository.create({
        ...createUserDto, 
        group: groupEntity, 
      });
      await this.userRepository.save(user);

      const courtesiesByGroup = groupEntity.courtesy_by_group;
      for (const courtesyByGroup of courtesiesByGroup) {
        const courtesyByUser = this.courtesiesByUserRepository.create({
            user: user,
            courtesy_by_group: courtesyByGroup,
        });
        await this.courtesiesByUserRepository.save(courtesyByUser);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({
      where: { id },
      relations: {group: true}
    });
    if (!user) {
      throw new InternalServerErrorException(`Element with id ${id} not found.`);
    }
    return user;
  }

  findOneByEmail(email: string) {
    const user = this.userRepository.findOne({
      where: { email },
      relations: {group: true}
    });
    if (!user) {
      throw new InternalServerErrorException(`Element with id ${email} not found.`);
    }
    return user;
    //return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
