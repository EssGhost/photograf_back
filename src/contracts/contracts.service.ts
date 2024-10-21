import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { contracts } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ContractsService {
  constructor( @InjectRepository(contracts)
  private contraRepo: Repository<contracts>){}

 async create(createContractDto: CreateContractDto) {
  try {
    const contra = this.contraRepo.create(createContractDto);
    await this.contraRepo.save(contra); //aqui ya se guarda en la bd los datos ingresados
    return contra;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }  }

  async findAll() {
    try {
      const contra = await this.contraRepo.find();
      return contra;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async search(query: string) {
    const usuarios = await this.contraRepo.find({
      where: {
        placa: Like(`%${query}%`),
      },
    });
    return usuarios;
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
