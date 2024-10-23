import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { contracts } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ContractsService {

  constructor(
    @InjectRepository(contracts)
    private readonly contractRepository:Repository<contracts>,
    private readonly userService : UsersService,
  ){}
  
  
  async create(createContractDto: CreateContractDto, userId: number) {
    try {
      const user = await this.userService.findOne(userId);
      const contract = await this.contractRepository.create({
        ...createContractDto,
      user: user,
      });
      await this.contractRepository.save(contract);
      return contract;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all contracts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
