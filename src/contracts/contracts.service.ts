import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { contracts } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { payments } from 'src/payments/entities/payment.entity';

@Injectable()
export class ContractsService {

  constructor(
    @InjectRepository(contracts)
    private readonly contractRepository:Repository<contracts>,
    private readonly userService : UsersService,
  ){}

  async create(createContractDto: CreateContractDto, @ActiveUser() user: any) {
    try {
      const activeUser = await this.userService.findOne(user);
      const contract = await this.contractRepository.create({
        ...createContractDto,
        user: activeUser,
      });
      console.log('Valores del contrato a guardar:', createContractDto);
      await this.contractRepository.save(contract);
      return contract;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
            `El usuario tiene un contrato asociado.`
        );
      }
    throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const contract =  await this.contractRepository.find({relations:['category']});
      return contract;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  async showTrueFields( @ActiveUser() user: any ) {
    const activeUser = user;
    const record = await this.contractRepository.findOne({
      where: { user: {id: activeUser} },
    });
    if (!record) {
      throw new Error('Registro no encontrado');
    }
    console.log(record);
    const trueFields = Object.entries(record)
      .filter(([key, value]) => typeof value === 'boolean' && value === true && key !== 'status')
      .map(([key]) => key);
    return trueFields;
  }

  async findOne(id: number) {
    const contract = await this.contractRepository.findOne({
      where: {
        id,
      },
    });
    if (!contract) {
      throw new NotFoundException('Contrato no encontrado');
    }
    return contract;  
  }


  async update(id: number, updateContractDto: UpdateContractDto) {
    try {
      const contract = await this.contractRepository.preload({
        //preload precarga la info que ya esta en la bd
        id,
        ...updateContractDto,
      });
      await this.contractRepository.save(contract);
      return contract;
    } catch (error) {
      InternalServerErrorException;
    }
  }  

  async remove(id: number) {
    const contract = await this.contractRepository.findOne({
      where: {
        id, //es lo mismo que id:id
      },
    });
    if (!contract) {
      throw new NotFoundException('Contrato no encontrado');
    }
    await this.contractRepository.delete(id);
    return {
      message: `El contrato con el id: ${id} se elimino correctamente`,
    };
  }
}