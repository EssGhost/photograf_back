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
            
            const newAdmin = await this.adminService.create({
                name : createAdminDto.name,
                lastname1 : createAdminDto.lastname1,
                lastname2 : createAdminDto.lastname2,
                email : createAdminDto.email,
                username : createAdminDto.username,
                password : await bcrypt.hash(createAdminDto.password, 10),
                sucursal : createAdminDto.sucursal,
            });
            //const { password, ...adminWithoutPassword } = newAdmin;

            return newAdmin;
        }

        async loginAdmin(loginDto : LoginDto){
            const admin = await this.adminService.findByUsernameWithPassword(loginDto.username);
            
            if (!admin) {
                throw new UnauthorizedException('Username incorrect');
            }

            const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
            
            if (!isPasswordValid) {
                throw new UnauthorizedException('Password incorrect');
            }

            const payload = { email: admin.email, role: admin.role };
            const token = await this.jwtService.signAsync(payload);

            return { username: loginDto.username, token };
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
            group : createUserDto.group,
        });

        const username = `${newUser.name}${newUser.id}`;

        const rawPassword = this.userService.generateRandomPassword();

        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        await this.credentialsService.create({
            username,
            password : hashedPassword,
            user : newUser
        });

        return newUser ;
    }

    async loginUser(loginDto : LoginDto){
        
        const credential = await this.credentialsService.findOneByUsernameWithUser(loginDto.username);
        //const credential = await this.credentialsService.findOneByUsername(loginDto.username);
        
        if (!credential) {
            throw new UnauthorizedException('Username incorrect');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, credential.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password incorrect');
        }

        const payload = { email: credential.user.email, role: credential.user.role };
        const token = await this.jwtService.signAsync(payload);

        return { credential , token };
    }


    //pruebas
    async profile({ email, role }: { email: string; role: string }) {
        return await this.userService.findOneByEmail(email);
    }
    
    async profile2({ email, role }: { email: string; role: string }) {
        return await this.adminService.findOneByEmail(email);
    }
}