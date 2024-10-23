import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

//service
import { AuthService } from './auth.service';
import { ContractsService } from '../contracts/contracts.service';

//dtos
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateContractDto } from 'src/contracts/dto/create-contract.dto';
import { CreateCredentialDto } from 'src/credentials/dto/create-credential.dto';
//guard
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly contractService: ContractsService
    ) {}

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
    @Post('registerUser')
    async registerUser(@Body() CreateUserDto: CreateUserDto) {
        return await this.authService.registerUser(CreateUserDto);
    }

    @Post('loginUser')
    @UseGuards(AuthGuard)
    login(
        @Body()
        CreateCredentialDto : CreateCredentialDto
    ){
        return this.authService.loginUser(CreateCredentialDto);
    }
}
