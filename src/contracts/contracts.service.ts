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
      console.log(activeUser);
      const contract = await this.contractRepository.create({
        ...createContractDto,
        user: activeUser,
      });
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

  findAll() {
    return `This action returns all contracts`;
  }

  async findOne(id: number) {
    const user = await this.contractRepository.findOne({
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
      const user = await this.contractRepository.preload({
        //preload precarga la info que ya esta en la bd
        id,
        ...updateContractDto,
      });
      await this.contractRepository.save(user);
      return user;
    } catch (error) {
      InternalServerErrorException;
    }
  }  


  async remove(id: number) {
    const user = await this.contractRepository.findOne({
      where: {
        id, //es lo mismo que id:id
      },
    });
    if (!user) {
      throw new NotFoundException('Contrato no encontrado');
    }
    await this.contractRepository.delete(id);
    return {
      message: `El contrato con el id: ${id} se elimino correctamente`,
    };
  }


  async createContract(createContractDto: CreateContractDto): Promise<contracts> {
    // Crear el contrato
    const newContract = this.contraRepo.create(createContractDto);

    // Si se incluye userId en el DTO, lo asignamos al contrato antes de guardarlo
    if (createContractDto.userId) {
        newContract.user = { id: createContractDto.userId } as any; // Relación ManyToOne con el usuario
    }

    // Guardamos el contrato
    return await this.contraRepo.save(newContract);
}


}
    // Luego creamos el pago asociado
    /*const payment = new payments();
    payment.contract = savedContract;
    payment.state = 'Pendiente';
    payment.method = 'stripe'; // O el método de pago que uses por defecto
    payment.pay_date = new Date(); // Fecha de creación del pago
    payment.external_transaction_id = `pending_${Date.now()}`; // ID temporal hasta que se procese el pago
    
   
    
    // Guardamos el pago
    await this.paymentsRepository.save(payment);*/