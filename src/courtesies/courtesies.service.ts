import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourtesyDto } from './dto/create-courtesy.dto';
import { UpdateCourtesyDto } from './dto/update-courtesy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { courtesies } from './entities/courtesy.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CourtesiesService {

  constructor( @InjectRepository(courtesies)
  private courtesyRepository: Repository<courtesies>){}

  async create(createCourtesyDto: CreateCourtesyDto) {
    try {
      const courtesy = this.courtesyRepository.create(createCourtesyDto);
      await this.courtesyRepository.save(courtesy);
      return courtesy;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }   
  }

  async findAll() {
    try {
      const courtesy = await this.courtesyRepository.find();
      return courtesy;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }  }

    async search(query: string) {
      const courtesy = await this.courtesyRepository.find({
        where: {
          name: Like(`%${query}%`),
        },
      });
      return courtesy;
    }

  async findOne(id: number) {
    const courtesy = await this.courtesyRepository.findOne({
      where: {
        id,
      },
    });
    if (!courtesy) {
      throw new NotFoundException('Cortesia no encontrada');
    }
    return courtesy;    }

  async update(id: number, updateCourtesyDto: UpdateCourtesyDto) {
    try {
      const courtesy = await this.courtesyRepository.preload({
        //preload precarga la info que ya esta en la bd
        id,
        ...updateCourtesyDto,
      });
      await this.courtesyRepository.save(courtesy);
      return courtesy;
    } catch (error) {
      InternalServerErrorException;
    }  }

  async remove(id: number) {
    const courtesy = await this.courtesyRepository.findOne({
      where: {
        id, //es lo mismo que id:id
      },
    });
    if (!courtesy) {
      throw new NotFoundException('Cortesia no encontrado');
    }
    await this.courtesyRepository.delete(id);
    return {
      message: `La cortesia con el id: ${id} se elimino correctamente`,
    };
  }  
}

