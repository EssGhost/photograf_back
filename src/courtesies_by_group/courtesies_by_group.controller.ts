import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CourtesiesByGroupService } from './courtesies_by_group.service';
import { CreateCourtesiesByGroupDto } from './dto/create-courtesies_by_group.dto';
import { UpdateCourtesiesByGroupDto } from './dto/update-courtesies_by_group.dto';
import { ActiveUser } from '../auth/common/decorators/active-user.decorator';
import { UserActivceInterface } from '../auth/common/interfaces/user-active.interface';

@Controller('courtesies-by-group')
export class CourtesiesByGroupController {
  constructor(private readonly courtesiesByGroupService: CourtesiesByGroupService) {}

  @Post()
  create(@Body() createCourtesiesByGroupDto: CreateCourtesiesByGroupDto) {
    return this.courtesiesByGroupService.create(createCourtesiesByGroupDto);
  }

  @Get()
  findAll() {
    return this.courtesiesByGroupService.findAll();
  }
  
  @Get('findCourtesiesByGroup')
  async findByGroup(@ActiveUser() user: UserActivceInterface) {
    const userId = user.id// Extraer el ID del usuario del token
    return this.courtesiesByGroupService.findByGroupByActiveUser(userId); // Asegúrate de que `user.id` esté disponible
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtesiesByGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourtesiesByGroupDto: UpdateCourtesiesByGroupDto) {
    return this.courtesiesByGroupService.update(+id, updateCourtesiesByGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courtesiesByGroupService.remove(+id);
  }
}
