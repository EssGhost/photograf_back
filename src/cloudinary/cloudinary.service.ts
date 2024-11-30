import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResult } from './cloudinary.types';

type CloudinaryInstance = typeof cloudinary;

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary: CloudinaryInstance,
  ) {}

  // Subir una sola imagen
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Permite varios tipos de archivos (imagen, video, etc.)
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        },
      ).end(file.buffer); // Usa el buffer del archivo
    });
  }

  // Subir múltiples imágenes
  async uploadImages(files: Express.Multer.File[], folder: string): Promise<CloudinaryUploadResult[]> {
    const uploadPromises = files.map((file) =>
      new Promise<CloudinaryUploadResult>((resolve, reject) => {
        this.cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder, // Especifica la carpeta
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          },
        ).end(file.buffer); // Usa el buffer de cada archivo
      }),
    );

    return Promise.all(uploadPromises);
  }
}
