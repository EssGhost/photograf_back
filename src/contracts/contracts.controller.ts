import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ActiveUser } from '../auth/common/decorators/active-user.decorator';
import { UserActivceInterface } from '../auth/common/interfaces/user-active.interface';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../auth/common/enums/role.enum';

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
  ) {}

  @Post('createContract')
  @Auth(Role.USER)
  create(@Body() createContractDto: CreateContractDto, @ActiveUser() user: UserActivceInterface) {
    const userId = user.id;
    return this.contractsService.create(createContractDto, userId);
  }

  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @Get('trueFields')
  @Auth(Role.USER)
  async getTrueFields(@ActiveUser() user: UserActivceInterface) {
    const userId = user.id;
    return this.contractsService.showTrueFields(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id);
  }
}
