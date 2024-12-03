import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourtesiesByUserService } from './courtesies_by_user.service';
import { CreateCourtesiesByUserDto } from './dto/create-courtesies_by_user.dto';
import { UpdateCourtesiesByUserDto } from './dto/update-courtesies_by_user.dto';
import { ActiveUser } from '../auth/common/decorators/active-user.decorator';
import { UserActivceInterface } from '../auth/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/auth/common/enums/role.enum';

@Controller('courtesies-by-user')
export class CourtesiesByUserController {
  constructor(private readonly courtesiesByUserService: CourtesiesByUserService) {}

  @Post('/createCBU')
  @Auth(Role.USER)
  create(@Body() createCourtesiesByUserDto: CreateCourtesiesByUserDto, @ActiveUser() user: UserActivceInterface ) {
    const userId = user.id;
    return this.courtesiesByUserService.create(createCourtesiesByUserDto, userId);
  }

  @Get()
  findAll() {
    return this.courtesiesByUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtesiesByUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourtesiesByUserDto: UpdateCourtesiesByUserDto) {
    return this.courtesiesByUserService.update(+id, updateCourtesiesByUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courtesiesByUserService.remove(+id);
  }
}
