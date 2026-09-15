import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class WalletRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findByUserId(id: number) {
    return await this.prismaService.wallet.findFirst({
      where: {
        userId: id
      }
    });
  }

  async findOne(id: number) {
    return await this.prismaService.wallet.findFirst({
      where: {
        id
      }
    });
  }

  async updateAmount(id: number, amount: number) {
    return await this.prismaService.wallet.update({
      where: {
        id,
      },
      data: {
        balance: amount
      },
    });
  }
}
