import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

//admin
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    ///// Admins /////
    @Post('registerAdmin')
    registerAdmin(
        @Body()
        CreateAdminDto : CreateAdminDto
    ) {
        return this.authService.registerAdmin(CreateAdminDto);
    }

    @Post('loginAdmin')
    loginAdmin(
        @Body()
        loginDto : LoginDto
    ){
        return this.authService.loginAdmin(loginDto);
    }

    ///// Users /////
    // @Post('registerUser')
    // registerUser(
    //     @Body()
    //     CreateUserDto : CreateUserDto
    // ) {
    //     return this.authService.registerUser(CreateUserDto);
    // }

    // @Post('loginUser')
    // login(
    //     @Body()
    //     loginDto : LoginDto
    // ){
    //     return this.authService.login(loginDto);
    // }
}
