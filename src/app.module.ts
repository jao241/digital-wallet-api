import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { WalletModule } from './wallet/wallet.module.js';
import { TransactionModule } from './transaction/transaction.module.js';

@Module({
  imports: [PrismaModule, UserModule, WalletModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
