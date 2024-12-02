import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { credentials } from './entities/credential.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CredentialsService {

  constructor(
    @InjectRepository(credentials)
    private readonly credentialRepository : Repository<credentials>
  ){}

  async create(CreateCredentialDto: CreateCredentialDto) {
    try {
      const credential = await this.credentialRepository.create(CreateCredentialDto);
      await this.credentialRepository.save(credential);
      return credential;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // create(createCredentialDto: CreateCredentialDto) {
  //   return 'This action adds a new credential';
  // }

  async findOneByUsernameWithUser(username: string) {
    return this.credentialRepository.findOne({
        where: { username },
        relations: ['user'], // Esto cargará la relación con el usuario
    });
}

  findAll() {
    return `This action returns all credentials`;
  }

  async findOne(id: number) {
    const credential = await this.credentialRepository.findOne({
      where: {
        id,
      },
    });
    if (!credential) {
      throw new NotFoundException('Credential no encontrada');
    }
    return credential;    
  }

  findOneByUsername(username: string) {
    return this.credentialRepository.findOneBy({ username });
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto) {
    try {
      const credential = await this.credentialRepository.preload({
        id,
        ... updateCredentialDto
      });
      await this.credentialRepository.save(credential);
      return credential;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
