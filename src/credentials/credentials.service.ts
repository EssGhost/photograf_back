import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  findOneByEmail(username: string) {
    return this.credentialRepository.findOneBy({ username });
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
