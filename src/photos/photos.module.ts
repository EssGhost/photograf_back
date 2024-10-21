import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { photos } from './entities/photo.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [
    TypeOrmModule.forFeature([photos]),
    CloudinaryModule
],
})
export class PhotosModule {}
