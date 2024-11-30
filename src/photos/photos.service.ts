import { Get, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { photos } from './entities/photo.entity';
import { Like, Repository } from 'typeorm';
import { users } from 'src/users/entities/user.entity';
import { groups } from 'src/groups/entities/group.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(photos) private photoRepo: Repository<photos>,
    @InjectRepository(users) private usersRepo: Repository<users>,
    @InjectRepository(groups) private groupsRepo: Repository<groups>,
  ){}

  async create(createPhotoDto: CreatePhotoDto): Promise<photos> {
    const { userId, groupId, image_urls } = createPhotoDto;
  
    // Buscar usuario y grupo
    const user = await this.usersRepo.findOneBy({ id: userId });
    const group = await this.groupsRepo.findOneBy({ id: groupId });
  
    if (!user || !group) {
      throw new Error('User or Group not found');
    }
  
    // Crear la entidad de fotos
    const photo = this.photoRepo.create({
      name: photos.name,  // Unimos las URLs si hay varias
      image_urls: image_urls,
      user: user,
      group: group,
    });
  
    return await this.photoRepo.save(photo);
  }

  async getPhotosByUser(userId: number) {
    try {
      const photos = await this.photoRepo.find({
        where: { user: { id: userId } },
        relations: ['user', 'group'],
        select: ['id', 'name', 'image_urls', 'user', 'group'], // Traemos solo lo necesario
      });

      if (!photos || photos.length === 0) {
        throw new Error('No photos found for the given user');
      }

      return photos;
    } catch (error) {
      throw new Error(`Error fetching photos by user: ${error.message}`);
    }
  }

  async getPhotosByGroup(groupId: number) {
    try {
      const photos = await this.photoRepo.find({
        where: { group: { id: groupId } },
        relations: ['user', 'group'],
        select: ['id', 'name', 'image_urls', 'user', 'group'], // Traemos solo lo necesario
      });

      if (!photos || photos.length === 0) {
        throw new Error('No photos found for the given group');
      }

      return photos;
    } catch (error) {
      throw new Error(`Error fetching photos by group: ${error.message}`);
    }
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
