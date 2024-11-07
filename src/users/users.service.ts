import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(users)
    private readonly userRepository: Repository<users>
  ) {}

  generateRandomPassword(): string {
    const password = randomBytes(5).toString('hex');
    console.log(password);
    return password;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  // findOneByUsername(username: string) {
  //   return this.userRepository.findOneBy({ username });
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
