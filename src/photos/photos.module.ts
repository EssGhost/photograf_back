import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { photos } from './entities/photo.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { groups } from 'src/groups/entities/group.entity';
import { users } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [
    TypeOrmModule.forFeature([photos, groups, users]),
    CloudinaryModule, UsersModule, GroupsModule
],
})
export class PhotosModule {}
