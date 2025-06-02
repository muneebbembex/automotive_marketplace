import { Controller, Get, Patch, Param, Body, UseGuards, Post, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole, User } from './entities/users.entity';
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
  async getAllDealers() {
    return this.usersService.findAllDealers();
  }

  // ALL ADMINS (assuming "findAllUsers" returns admins)
  @Get('admins')
  async getAllAdmins() {
    return this.usersService.findAllUsers();
  }

  // BY ID
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // BY EMAIL
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // DEALER BY ID
  @Get('dealers/:id')
  async getDealerById(@Param('id') id: string) {
    return this.usersService.findDealerById(id, UserRole.DEALER);
  }

  // ADMIN BY ID
  @Get('admins/:id')
  async getAdminById(@Param('id') id: string) {
    return this.usersService.findUserById(id, UserRole.ADMIN);
  }

  // CREATE
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // UPDATE DEALER STATUS
  @Patch('dealers/:id/status')
  async updateDealerStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.usersService.setDealerStatus(id, isActive);
  }

  // UPDATE USER (general)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // DELETE USER
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.DeleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
