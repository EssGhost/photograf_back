import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { contracts } from './entities/contract.entity';

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,

  ) {}

  @Post()
  async createContract(
      @Body() createContractDto: CreateContractDto
  ): Promise<contracts> {
      return this.contractsService.createContract(createContractDto);
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
