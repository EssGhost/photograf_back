import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourtesiesByGroupService } from './courtesies_by_group.service';
import { CreateCourtesiesByGroupDto } from './dto/create-courtesies_by_group.dto';
import { UpdateCourtesiesByGroupDto } from './dto/update-courtesies_by_group.dto';

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
