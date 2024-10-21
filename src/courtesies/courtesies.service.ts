import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourtesyDto } from './dto/create-courtesy.dto';
import { UpdateCourtesyDto } from './dto/update-courtesy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { courtesies } from './entities/courtesy.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CourtesiesService {

  constructor( @InjectRepository(courtesies)
  private corteRepo: Repository<courtesies>){}

  async create(createCourtesyDto: CreateCourtesyDto) {
    try {
      const corte = this.corteRepo.create(createCourtesyDto);
      await this.corteRepo.save(corte); //aqui ya se guarda en la bd los datos ingresados
      return corte;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }   }

  async findAll() {
    try {
      const corte = await this.corteRepo.find();
      return corte;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }  }

    async search(query: string) {
      const corte = await this.corteRepo.find({
        where: {
          name: Like(`%${query}%`),
        },
      });
      return corte;
    }

  async findOne(id: number) {
    const corte = await this.corteRepo.findOne({
      where: {
        id,
      },
    });
    if (!corte) {
      throw new NotFoundException('Cortesia no encontrada');
    }
    return corte;    }

  async update(id: number, updateCourtesyDto: UpdateCourtesyDto) {
    try {
      const corte = await this.corteRepo.preload({
        //preload precarga la info que ya esta en la bd
        id,
        ...updateCourtesyDto,
      });
      await this.corteRepo.save(corte);
      return corte;
    } catch (error) {
      InternalServerErrorException;
    }  }

  async remove(id: number) {
    const corte = await this.corteRepo.findOne({
      where: {
        id, //es lo mismo que id:id
      },
    });
    if (!corte) {
      throw new NotFoundException('Cortesia no encontrado');
    }
    await this.corteRepo.delete(id);
    return {
      message: `La cortesia con el id: ${id} se elimino correctamente`,
    };
  }  
}

