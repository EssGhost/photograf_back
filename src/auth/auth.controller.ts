import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
//service
import { AuthService } from './auth.service';
import { ContractsService } from '../contracts/contracts.service';

//dtos
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
//guard
import { AuthGuard } from './guard/auth.guard';

//roles
import { Role } from './common/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from './common/decorators/active-user.decorator';
import { UserActivceInterface } from './common/interfaces/user-active.interface';


interface RequestWithUser extends Request {
    user: {
        email: string;
        role: string;
    }
}


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    ///// Admins /////
    @Post('registerAdmin')
    async registerAdmin(
        @Body()
        CreateAdminDto : CreateAdminDto
    ) {
        return await this.authService.registerAdmin(CreateAdminDto);
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
    login(@Body()loginDto : LoginDto){
        return this.authService.loginUser(loginDto);
    }

    // @Get('profile')
    // @Auth(Role.USER)
    // profile(@ActiveUser() user: UserActivceInterface) {
    //     return this.authService.profile(user)
    // }

    // @Get('profileAdmin')
    // @Auth(Role.ADMIN)
    // profileAdmin(@ActiveUser() user: UserActivceInterface) {
    //     return this.authService.profile2(user)
    // }

    // @Get('profile')
    // @Auth(Role.USER)
    // profile(
    //     @Req() req: RequestWithUser) {
    //     return this.authService.profile(req.user)
    // }

    // @Get('profileAdmin')
    // @Auth(Role.ADMIN)
    // profileAdmin(
    //     @Req() req: RequestWithUser) {
    //     return this.authService.profile2(req.user)
    // }

}
