import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryUploadResult } from 'src/cloudinary/cloudinary.types';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly cloudinaryService: CloudinaryService,

  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async uploadProduct(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() createProductDto: CreatePhotoDto,
  ) {
    try {
      if (!files.images || files.images.length === 0) {
        throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
      }

      const uploadResults: CloudinaryUploadResult[] =
        await this.cloudinaryService.uploadImages(files.images);
      const imageUrls = uploadResults.map((result) => result.secure_url);

      // Crear el producto con las URLs de las imágenes
      const product = await this.photosService.create({
        ...createProductDto,
        image_urls: imageUrls,
      });

      return product;
    } catch (error) {
      console.error('Error subiendo el producto:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
