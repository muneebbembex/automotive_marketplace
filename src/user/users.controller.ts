import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ALL USERS
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // ALL DEALERS
  @Get('dealers')
  async getAllDealers(): Promise<User[]> {
    return this.usersService.findAllDealers();
  }

  // ALL ADMINS (assuming "findAllUsers" returns admins)
  @Get('admins')
  async getAllAdmins(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  // BY ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }

  // BY EMAIL
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  // DEALER BY ID
  @Get('dealers/:id')
  async getDealerById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findDealerById(id, UserRole.DEALER);
  }

  // ADMIN BY ID
  @Get('admins/:id')
  async getAdminById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUserById(id, UserRole.ADMIN);
  }

  // CREATE
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // UPDATE DEALER STATUS
  @Patch('dealers/:id/status')
  async updateDealerStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ): Promise<User> {
    return this.usersService.setDealerStatus(id, isActive);
  }

  // UPDATE USER (general)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // DELETE USER
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.DeleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
