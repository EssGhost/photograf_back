import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AdminsService } from 'src/admins/admins.service';

//admin
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly adminService : AdminsService,
        private readonly userService : UsersService,
        ){}

        /////  admins  /////
        async registerAdmin(CreateAdminDto : CreateAdminDto){
            const admin = await this.adminService.findOneByEmail(CreateAdminDto.email)
            const admin2 = await this.adminService.findOneByUsername(CreateAdminDto.username)
            
            if (admin) {
                throw new BadRequestException('Email already in use');
            } else if (admin2) {
                throw new BadRequestException('Username already in use');
            }

    
            return await this.adminService.create({
                name : CreateAdminDto.name,
                lastname1 : CreateAdminDto.lastname1,
                lastname2 : CreateAdminDto.lastname2,
                email : CreateAdminDto.email,
                username : CreateAdminDto.username,
                password : await bcrypt.hash(CreateAdminDto.password, 10),
                sucursal : CreateAdminDto.sucursal,
            })
        }
    
        async loginAdmin(loginDto : LoginDto){
            const admin = await this.adminService.findOneByUsername(loginDto.username);
            
            if (!admin) {
                throw new UnauthorizedException('Username incorrect');
            }
    
            const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
            
            if (!isPasswordValid) {
                throw new UnauthorizedException('Password incorrect');
            }
    
            return admin;
        }



        /////  users  /////
    // async registerUser(CreateUserDto : CreateUserDto){
    //     const user = await this.userService.findOneByEmail(CreateUserDto.email)
        
    //     if (user) {
    //         throw new BadRequestException('Email already in use');
    //     }

    //     return await this.userService.create({
    //         name : CreateUserDto.name,
    //         lastname1 : CreateUserDto.lastname1,
    //         lastname2 : CreateUserDto.lastname2,
    //         email : CreateUserDto.email,
    //         phone : CreateUserDto.phone,
    //         tag : CreateUserDto.tag,
    //         instagram : CreateUserDto.instagram,
    //         facebook : CreateUserDto.facebook,
    //         toga : CreateUserDto.toga,
    //     })
    // }

    // async loginUser(loginDto : LoginDto){
    //     const user = await this.userService.findOneByEmail(loginDto.email);
        
    //     if (!user) {
    //         throw new UnauthorizedException('Email incorrect');
    //     }

    //     const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        
    //     if (!isPasswordValid) {
    //         throw new UnauthorizedException('Password incorrect');
    //     }

    //     return user;
    // }
}
