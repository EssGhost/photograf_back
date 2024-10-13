import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourtesiesByUserService } from './courtesies_by_user.service';
import { CreateCourtesiesByUserDto } from './dto/create-courtesies_by_user.dto';
import { UpdateCourtesiesByUserDto } from './dto/update-courtesies_by_user.dto';

@Controller('courtesies-by-user')
export class CourtesiesByUserController {
  constructor(private readonly courtesiesByUserService: CourtesiesByUserService) {}

  @Post()
  create(@Body() createCourtesiesByUserDto: CreateCourtesiesByUserDto) {
    return this.courtesiesByUserService.create(createCourtesiesByUserDto);
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
