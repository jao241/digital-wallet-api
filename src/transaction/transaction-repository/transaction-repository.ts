import {
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateTransactionDto } from '../dto/create-transaction.dto.js';
import { TransactionStatus } from '../../generated/prisma/enums.js';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAllByUserId(id: number) {
    return await this.prismaService.transaction.findMany({
      where: {
        OR: [
          {
            originWallet: {
              userId: id,
            },
          },
          {
            destinationWallet: {
              userId: id,
            },
          },
        ],
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.transaction.findFirst({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: number, status: TransactionStatus) {
    return await this.prismaService.transaction.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async transfer(data: CreateTransactionDto) {
    return await this.prismaService.$transaction(async (prisma) => {
      const originWallet = await prisma.wallet.findUnique({
        where: {
          id: data.originWalletId,
        },
      });

      const destinationWallet = await prisma.wallet.findUnique({
        where: {
          id: data.destinationWalletId,
        },
      });

      const newOriginAmount = originWallet!.balance - data.amount;
      const newDestinationAmount = destinationWallet!.balance + data.amount;

      await prisma.wallet.update({
        where: {
          id: originWallet!.id,
        },
        data: {
          balance: newOriginAmount,
        },
      });

      await prisma.wallet.update({
        where: {
          id: destinationWallet!.id,
        },
        data: {
          balance: newDestinationAmount,
        },
      });

      return await prisma.transaction.create({
        data: {
          amount: data.amount,
          originWalletId: originWallet!.id,
          destinationWalletId: destinationWallet!.id,
          status: TransactionStatus.COMPLETED,
        },
      });
    });
  }

  async reverse(transactionId: number) {
    return await this.prismaService.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id: transactionId,
        },
      });

      if (!transaction) {
        return null;
      }

      const originWallet = await prisma.wallet.findUnique({
        where: {
          id: transaction.originWalletId,
        },
      });

      if (!originWallet) {
        return null;
      }

      const destinationWallet = await prisma.wallet.findUnique({
        where: {
          id: transaction.destinationWalletId,
        },
      });

      if (!destinationWallet) {
        return null;
      }

      const newOriginAmount = originWallet.balance + transaction.amount;

      const newDestinationAmount =
        destinationWallet.balance - transaction.amount;

      await prisma.wallet.update({
        where: {
          id: originWallet.id,
        },
        data: {
          balance: newOriginAmount,
        },
      });

      await prisma.wallet.update({
        where: {
          id: destinationWallet.id,
        },
        data: {
          balance: newDestinationAmount,
        },
      });

      await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: TransactionStatus.REVERSED,
        },
      });

      return await prisma.transaction.create({
        data: {
          amount: transaction.amount,
          originWalletId: destinationWallet.id,
          destinationWalletId: originWallet.id,
          status: TransactionStatus.COMPLETED,
        },
      });
    });
  }
}
