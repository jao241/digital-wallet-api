import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiOperation({
    summary: 'Lista todos os usuários',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os usuários ou um objeto vazio',
  })
  findMany() {
    return this.userService.findMany();
  }
}
