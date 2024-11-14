import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('createContract')
  @UseGuards(AuthGuard)
  create(@Body() createContractDto: CreateContractDto, @Request() req) {
    return this.contractsService.create(createContractDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(+id);
  }


  @Get('/search')
  search(@Query('query')query:string){
    return this.contractsService.search(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractsDto: UpdateContractDto,
  ) {
    return this.contractsService.update(+id, updateContractsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id);
  }
}
