import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from '../../commons/schemas/user.schema';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: 'OK' })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch Users' })
  @ApiResponse({ status: 200, description: 'Fetch All Users', type: [User] })
  async findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch User by _id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: `User's '_id' Value(to Fetch)`,
  })
  @ApiResponse({ status: 200, description: 'Fetch One User', type: User })
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `User's '_id' Value(to Delete)`,
  })
  @ApiOperation({ summary: 'Delete User by _id' })
  @ApiResponse({ status: 200, description: 'Delete One User', type: User })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
