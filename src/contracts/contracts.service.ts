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

  async findOne(id: number) {
    const user = await this.contraRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Contrato no encontrado');
    }
    return user;  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    try {
      const user = await this.contraRepo.preload({
        //preload precarga la info que ya esta en la bd
        id,
        ...updateContractDto,
      });
      await this.contraRepo.save(user);
      return user;
    } catch (error) {
      InternalServerErrorException;
    }
  }  


  async remove(id: number) {
    const user = await this.contraRepo.findOne({
      where: {
        id, //es lo mismo que id:id
      },
    });
    if (!user) {
      throw new NotFoundException('Contrato no encontrado');
    }
    await this.contraRepo.delete(id);
    return {
      message: `El contrato con el id: ${id} se elimino correctamente`,
    };
  }

}
