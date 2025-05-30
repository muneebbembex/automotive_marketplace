import { Controller, Get, Patch, Param, Body, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('dealers')
  async getDealers() {
    return this.usersService.findAllDealers();
  }
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('dealers/:id/status')
  async updateDealerStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.usersService.setDealerStatus(id, isActive);
  }
}
