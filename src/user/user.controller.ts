import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Create User
  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }
  @Post()
  async signup(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return {
      message: 'User created successfully',
      user: result.user,
      token: result.token,
    };
  }

  // Get All Users
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Get User by ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // Update User
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  // Delete User
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
