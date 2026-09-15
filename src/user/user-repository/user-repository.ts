import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findMany() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        wallet: true,
      },
    });
  }
}
