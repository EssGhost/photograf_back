import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService : UsersService){}

    async register(registerDto : RegisterDto){
        const user = await this.userService.findOneByEmail(registerDto.email)
        
        if (user) {
            throw new BadRequestException('Email already in use');
        }

        return await this.userService.create({
            email : registerDto.email,
            password : await bcrypt.hash(registerDto.password, 10)
        })
    }

    async login(loginDto : LoginDto){
        const user = await this.userService.findOneByEmail(loginDto.email);
        
        if (!user) {
            throw new UnauthorizedException('Email incorrect');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password incorrect');
        }

        return user;
    }
}
