import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { photos } from './entities/photo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(photos)
    private photoRepo: Repository<photos>,
  ){}

  async create(createPhotoDto: CreatePhotoDto): Promise<photos> {
    const photo = this.photoRepo.create(createPhotoDto);
    return await this.photoRepo.save(photo);
}

  async findAll() {
    try {
      const res = this.photoRepo.find();
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }  }

  async findOne(id: number) {
    const photo = await this.photoRepo.findOne({
      where: {
        id,
      },
    });
    if (!photo) {
      throw new NotFoundException('Producto no encontrado');
    }
    return photo;  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  async remove(id: number) {
    const foto = await this.photoRepo.findOne({
      where: {
        id,
      },
    });
    await this.photoRepo.delete(id);
    if (!foto) {
      throw new NotFoundException('Foto no encontrada');
    }
    return foto;  }

  async busqueda(termino: string) {
    const buscados = await this.photoRepo.find({
      where: { name: Like(`%${termino}%`) },
    });
    return buscados;
  }
}
