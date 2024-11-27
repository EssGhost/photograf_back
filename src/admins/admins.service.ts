import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { admins } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(admins)
    private readonly adminRepository : Repository<admins>
  ){}

  async create(CreateAdminDto: CreateAdminDto) {
    try {
      const admin = await this.adminRepository.create(CreateAdminDto);
      await this.adminRepository.save(admin);
      return admin;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findByUsernameWithPassword(username: string){
    return this.adminRepository.findOne({
      where: { username },
      select: [ 'id','password', 'role' ]
    })
  }

  findAll() {
    return `This action returns all admins`;
  }

  async findOne(id: number) {  // Verifica el id recibido
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado.`);
    }
    return admin;
  }

  findOneByEmail(email: string) {
    return this.adminRepository.findOneBy({ email });
  }

  findOneByUsername(username: string) {
    return this.adminRepository.findOneBy({ username });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
