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
import { GroupsService } from 'src/groups/groups.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService : JwtService,
        private readonly adminService : AdminsService,
        private readonly userService : UsersService,
        private readonly credentialsService : CredentialsService,
        private readonly groupService : GroupsService,
        private readonly mailService: MailService,
        ){}

        private readonly TOKEN_EXPIRATION_TIME = 3600;

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
            console.log('Admin encontrado en loginAdmin:', admin);
            if (!admin) {
                throw new UnauthorizedException('Username incorrect');
            }

            const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
            
            if (!isPasswordValid) {
                throw new UnauthorizedException('Password incorrect');
            }
            const payload = { id: admin.id, role: admin.role };
            const token = await this.jwtService.signAsync(payload);

            return { username: loginDto.username, token, payload };
        }


        /////  users  /////
    async registerUser(createUserDto : CreateUserDto){
        const user = await this.userService.findOneByEmail(createUserDto.email);
        if (user) {
            throw new BadRequestException('Email already in use');
        }
        const groupEntity = await this.groupService.findOneByGroupCode(createUserDto.group);
        if (!groupEntity) {
            throw new BadRequestException(`Group with code ${createUserDto.group} not found`);
        }
        const newUser = await this.userService.create(createUserDto);
        const username = `${newUser.name}${newUser.id}`;
        const rawPassword = this.userService.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        await this.credentialsService.create({
            username,
            password : hashedPassword,
            user : newUser
        });
        return newUser;
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
        const payload = { id: credential.user.id, role: credential.user.role };
        const token = await this.jwtService.signAsync(payload);
        return { credential , token };
    }

    //recuperar password
    async recoverPassword(email: string): Promise<string> {
        // Paso 1: Buscar al usuario por su correo electrónico
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }
    
        // Paso 2: Generar una nueva contraseña aleatoria
        const newPassword = this.userService.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashear la contraseña.
    
        // Paso 3: Actualizar la contraseña en la tabla 'credentials'
        const credentials = await this.credentialsService.findOne(user.id);
        if (!credentials) {
            throw new BadRequestException('Credentials not found');
        }

        credentials.password = hashedPassword;
        await this.credentialsService.update(credentials.id, { password: hashedPassword }); // O el método equivalente en tu servicio.
    
        // Paso 4: Enviar la nueva contraseña por correo electrónico
        await this.mailService.sendMail({
            to: user.email,
            subject: 'Password Recovery',
            text: `Your new password is: ${newPassword}`, // Enviar la nueva contraseña en texto plano.
        });
    
        return 'Password has been sent to your email';
        }


    //pruebas
    async profile({ email, role }: { email: string; role: string }) {
        return await this.userService.findOneByEmail(email);
    }

    async profile2({ email, role }: { email: string; role: string }) {
        return await this.adminService.findOneByEmail(email);
    }
}