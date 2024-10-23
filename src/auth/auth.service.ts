import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//service
import { AdminsService } from 'src/admins/admins.service';
import { UsersService } from 'src/users/users.service';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
//dto's
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateCredentialDto } from 'src/credentials/dto/create-credential.dto';
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService : JwtService,
        private readonly adminService : AdminsService,
        private readonly userService : UsersService,
        private readonly credentialsService : CredentialsService,
        ){}

        /////  admins  /////
        async registerAdmin(createAdminDto : CreateAdminDto){
            const admin = await this.adminService.findOneByEmail(createAdminDto.email)
            const admin2 = await this.adminService.findOneByUsername(createAdminDto.username)
            
            if (admin) {
                throw new BadRequestException('Email already in use');
            } else if (admin2) {
                throw new BadRequestException('Username already in use');
            }
            
            return await this.adminService.create({
                name : createAdminDto.name,
                lastname1 : createAdminDto.lastname1,
                lastname2 : createAdminDto.lastname2,
                email : createAdminDto.email,
                username : createAdminDto.username,
                password : await bcrypt.hash(createAdminDto.password, 10),
                sucursal : createAdminDto.sucursal,
            });
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
    async registerUser(createUserDto : CreateUserDto){
        const user = await this.userService.findOneByEmail(createUserDto.email)
        
        if (user) {
            throw new BadRequestException('Email already in use');
        }

        const newUser = await this.userService.create({
            name : createUserDto.name,
            lastname1 : createUserDto.lastname1,
            lastname2 : createUserDto.lastname2,
            email : createUserDto.email,
            phone : createUserDto.phone,
            tag : createUserDto.tag,
            instagram : createUserDto.instagram,
            facebook : createUserDto.facebook,
            toga : createUserDto.toga,
            // group : CreateUserDto.group,
        });

        const username = `${newUser.name}${newUser.id}`;

        const rawPassword = this.userService.generateRandomPassword();

        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        await this.credentialsService.create({
            username,
            password : hashedPassword,
            user : newUser
        });

        const payload = { userId: newUser.id };
        const token = await this.jwtService.signAsync(payload);

        return { token, newUser, payload };
    }

    async loginUser(CreateCredentialDto : CreateCredentialDto){
        const credential = await this.credentialsService.findOneByEmail(CreateCredentialDto.username);
        
        if (!credential) {
            throw new UnauthorizedException('Email incorrect');
        }

        const isPasswordValid = await bcrypt.compare(CreateCredentialDto.password, credential.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password incorrect');
        }

        return credential;
    }
}