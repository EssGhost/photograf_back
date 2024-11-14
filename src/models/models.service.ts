import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { models } from './entities/model.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ModelsService {

  constructor( @InjectRepository(models)
  private modelRepo: Repository<models>){}

  async create(createModelDto: CreateModelDto) {
    try {
      const model = this.modelRepo.create(createModelDto);
      await this.modelRepo.save(model); //aqui ya se guarda en la bd los datos ingresados
      return model;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }   }

  async findAll() {
    try {
      const model = await this.modelRepo.find();
      return model;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }   }

    async search(query: string) {
      const model = await this.modelRepo.find({
        where: {
          name: Like(`%${query}%`),
        },
      });
      return model;
    }

  async findOne(id: number) {
    const model = await this.modelRepo.findOne({
      where: {
        id,
      },
    });
    if (!model) {
      throw new NotFoundException('Cortesia no encontrada');
    }
    return model;    }

  async update(id: number, updateModelDto: UpdateModelDto) {
    try {
      const model = await this.modelRepo.preload({
        //preload precarga la info que ya esta en la bd
        id,
        ...updateModelDto,
      });
      await this.modelRepo.save(model);
      return model;
    } catch (error) {
      InternalServerErrorException;
    }   }

  async remove(id: number) {
    const model = await this.modelRepo.findOne({
      where: {
        id, //es lo mismo que id:id
      },
    });
    if (!model) {
      throw new NotFoundException('Cortesia no encontrado');
    }
    await this.modelRepo.delete(id);
    return {
      message: `La cortesia con el id: ${id} se elimino correctamente`,
    };  }
}
