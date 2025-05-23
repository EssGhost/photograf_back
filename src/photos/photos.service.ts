import { Get, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { CreatePhotoByUserDto  } from './dto/create-photo-user.dto';
import { CreatePhotoByGroupDto  } from './dto/create-photo-group.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { photos } from './entities/photo.entity';
import { Like, Repository } from 'typeorm';
import { users } from 'src/users/entities/user.entity';
import { groups } from 'src/groups/entities/group.entity';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(photos) private photoRepo: Repository<photos>,
    @InjectRepository(users) private usersRepo: Repository<users>,
    @InjectRepository(groups) private groupsRepo: Repository<groups>,
  ){}

  // async create(createPhotoDto: CreatePhotoDto): Promise<photos> {
  //   const { userId, groupId, image_urls } = createPhotoDto;
  
  //   // Buscar usuario y grupo
  //   const user = await this.usersRepo.findOneBy({ id: userId });
  //   const group = await this.groupsRepo.findOneBy({ id: groupId });
  
  //   if (!user || !group) {
  //     throw new Error('User or Group not found');
  //   }
  
  //   // Crear la entidad de fotos
  //   const photo = this.photoRepo.create({
  //     name: photos.name,  // Unimos las URLs si hay varias
  //     image_urls: image_urls,
  //     user: user,
  //     group: group,
  //   });
  
  //   return await this.photoRepo.save(photo);
  // }
  async createPhotoByUser(userId: number, imageUrls: string): Promise<photos> {
    // Buscar usuario
    const user = await this.usersRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
  
    // Crear la entidad de foto
    const photo = this.photoRepo.create({
      name: imageUrls, // Unimos las URLs si hay varias
      image_urls: imageUrls,
      user: user,
    });
  
    return await this.photoRepo.save(photo);
  }

  async createPhotoByGroup(groupId: number, imageUrls: string): Promise<photos> {
    // Buscar grupo
    const group = await this.groupsRepo.findOneBy({ id: groupId });
    if (!group) {
      throw new Error('Group not found');
    }
  
    // Crear la entidad de foto
    const photo = this.photoRepo.create({
      name: imageUrls, // Unimos las URLs si hay varias
      image_urls: imageUrls,
      group: group,
    });
  
    return await this.photoRepo.save(photo);
  }
  
  

  async getPhotosByUser(@ActiveUser() user: any) {
    try {
      const activeUser=user;
      const photos = await this.usersRepo.findOne({
    
        where: { id: activeUser}, 
        relations: ['photo'], 
        select: ['id', 'photo'],      
      });
      return photos;
    } catch (error) {
      throw new Error(`Error al obtener fotos del usuario: ${error.message}`);
    }
  }

  
async getPhotosByGroup(@ActiveUser() user: any) {
  try {
    const activeUser = user;
    // Obtener al usuario con su grupo relacionado
    const userWithGroup = await this.usersRepo.findOne({
      where: { id: activeUser }, 
      relations: ['group'], 
    });

    if (!userWithGroup || !userWithGroup.group) {
      throw new NotFoundException('El usuario no pertenece a ningún grupo');
    }
    
    // Obtener el ID del grupo al que pertenece el usuario
    const groupId = userWithGroup.group.id;
    
    // Obtener todas las fotos del grupo relacionado
    const groupWithPhotos = await this.groupsRepo.findOne({
      where: { id: groupId }, 
      relations: ['photo'],
    });

    if (!groupWithPhotos || !groupWithPhotos.photo.length) {
      throw new NotFoundException('No se encontraron fotos para este grupo');
    }

    // Devolver todas las fotos del grupo
    return groupWithPhotos.photo;
  } catch (error) {
    // Si el error es una NotFoundException, lanzarlo directamente
    if (error instanceof NotFoundException) {
      throw error;
    }
    
    // Lanzar un error general con el mensaje en el cuerpo de la respuesta
    throw new Error(`Error: ${error.message}`);
  }
}


  // async getPhotosByGroup(@ActiveUser() user: any) {
  //   try {
  //     const activeUser = user;
  //     const userWithGroup = await this.usersRepo.findOne({
  //       where: { id: activeUser }, 
  //       relations: ['group'], 
  //     });
  
  //     if (!userWithGroup || !userWithGroup.group) {
  //       throw new NotFoundException('El usuario no pertenece a ningún grupo');
  //     }
  //     const groupId = userWithGroup.group.id;
  //     const photosInGroups = await this.photoRepo.findOne({
  //       where: { id: groupId },
  //       relations: ['group']
  //     })
  //     const groupWithPhotos = await this.groupsRepo.findOne({
  //             where: { id: groupId }, 
  //             relations: ['user', 'user.photo'], 
  //           });

  //     if (!groupWithPhotos || !groupWithPhotos.user.length) {
  //       throw new NotFoundException('No se encontraron fotos para este grupo');
  //     }
  
  //     const photos = groupWithPhotos.user.flatMap((user) => user.photo);
  //     return photos;
  //   } catch (error) {
  //     throw new Error(`Error: ${error.message}`);
  //   }
  // }
  

  // async getPhotosByGroup(@ActiveUser() user: any) {
  //   try {
  
  //     const userWithGroup = await this.usersRepo.findOne({
  //       where: { id: user.id }, 
  //       relations: ['group'],
  //     });
  //     console.log(userWithGroup);
  
  //     if (!userWithGroup || !userWithGroup.group) {
  //       throw new NotFoundException('El usuario no pertenece a ningún grupo');
  //     }
  
  //     const groupId = userWithGroup.group.id; 
  
  
  //     const groupWithPhotos = await this.groupsRepo.findOne({
  //       where: { id: groupId }, 
  //       relations: ['user', 'user.photo'], 
  //     });
  
  //     if (!groupWithPhotos ||  groupWithPhotos.user.length === 0) {
  //       throw new NotFoundException('No se encontraron fotos para este grupo');
  //     }
  
  
  //     const photos = groupWithPhotos.user.flatMap((user) => user.photo);
  //     return photos;
  //   } catch (error) {
  //     throw new Error(`Error: ${error.message}`);
  //   }
  // }

  async assignCategory(photoId: number, category: string): Promise<photos> {
    const photo = await this.photoRepo.findOne({ where: { id: photoId } });

    if (!photo) {
      throw new NotFoundException(`Photo with ID ${photoId} not found`);
    }

    photo.category = category; // Asigna la categoría directamente
    return this.photoRepo.save(photo); // Guarda la foto con la nueva categoría
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
