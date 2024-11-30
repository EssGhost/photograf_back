import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryUploadResult } from 'src/cloudinary/cloudinary.types';
import { UsersService } from 'src/users/users.service';
import { GroupsService } from 'src/groups/groups.service';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService

  ) {}

  @Post()
@UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 30 }]))
async uploadProduct(
  @UploadedFiles() files: { images?: Express.Multer.File[] },
  @Body() createPhotoDto: CreatePhotoDto,
) {
  try {

    if (!files.images || files.images.length === 0) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }

    const { userId, groupId } = createPhotoDto;

    // Verificar si el usuario y el grupo existen
    const user = await this.usersService.findOne(userId); // Busca el usuario
    const group = await this.groupsService.findOne(groupId); // Busca el grupo

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    // Subir imágenes a Cloudinary con la estructura de carpetas basada en nombres
    const uploadResults = await this.cloudinaryService.uploadImages(
      files.images,
      `groups/${group.name}/users/${user.name}`
    );

    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Crear las fotos asociadas al usuario y grupo
    const photo = await this.photosService.create({
      ...createPhotoDto,
      image_urls: imageUrls,
    });

    return photo;
  } catch (error) {
    console.error('Error al subir foto:', error);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

@Get('by-user/:userId')
async getPhotosByUser(@Param('userId') userId: number) {
  return this.photosService.getPhotosByUser(userId);
}

@Get('by-group/:groupId')
async getPhotosByGroup(@Param('groupId') groupId: number) {
  return this.photosService.getPhotosByGroup(groupId);
}

  @Get()
  findAll() {
    return this.photosService.findAll();
  }
  @Get('/search')
  search(@Query('termino') termino: string) {
    return this.photosService.busqueda(termino);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
