import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CourtesiesService } from './courtesies.service';
import { CreateCourtesyDto } from './dto/create-courtesy.dto';
import { UpdateCourtesyDto } from './dto/update-courtesy.dto';

@Controller('courtesies')
export class CourtesiesController {
  constructor(private readonly courtesiesService: CourtesiesService) {}

  @Post('createCourtesy')
  create(@Body() createCourtesyDto: CreateCourtesyDto) {
    return this.courtesiesService.create(createCourtesyDto);
  }

  @Get()
  findAll() {
    return this.courtesiesService.findAll();
  }
  
  @Get('/search')
  search(@Query('query')query:string){
    return this.courtesiesService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courtesiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourtesyDto: UpdateCourtesyDto,
  ) {
    return this.courtesiesService.update(+id, updateCourtesyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.courtesiesService.remove(+id);
  }
}
