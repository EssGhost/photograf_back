import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { ContractsModule } from './contracts/contracts.module';
import { GroupsModule } from './groups/groups.module';
import { ModelsModule } from './models/models.module';
import { PhotosModule } from './photos/photos.module';
import { CourtesiesByUserModule } from './courtesies_by_user/courtesies_by_user.module';
import { CourtesiesByGroupModule } from './courtesies_by_group/courtesies_by_group.module';
import { CourtesiesModule } from './courtesies/courtesies.module';
import { CredentialsModule } from './credentials/credentials.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'gearsofwar',
      database: 'photograf',
      autoLoadEntities: true,
      synchronize: true,}),
      UsersModule, AuthModule, AdminsModule, ContractsModule, GroupsModule, ModelsModule, PhotosModule, CourtesiesByUserModule, CourtesiesByGroupModule, CourtesiesModule, CredentialsModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
