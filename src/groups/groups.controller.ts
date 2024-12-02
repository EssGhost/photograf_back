import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ActiveUser } from '../auth/common/decorators/active-user.decorator';
import { UserActivceInterface } from '../auth/common/interfaces/user-active.interface';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../auth/common/enums/role.enum';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('createGroup')
  @Auth(Role.ADMIN)
  create(@Body() createGroupDto: CreateGroupDto, @ActiveUser() user: UserActivceInterface) {
    const { courtesyNames } = createGroupDto;
    const adminId = user.id;
    return this.groupsService.create(createGroupDto, adminId, courtesyNames);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get('/code/:groupCode')
  @Auth(Role.ADMIN || Role.USER)
  findOneByGroupCode(@Param('groupCode') groupCode: string) {
    return this.groupsService.findOneByGroupCode(groupCode);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
