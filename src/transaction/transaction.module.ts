import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller.js';
import { TransactionRepository } from './transaction-repository/transaction-repository.js';
import { TransactionService } from './transaction.service.js';
import { WalletRepository } from '../wallet/wallet-repository/wallet-repository.js';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule, PassportModule],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionService, WalletRepository],
})
export class TransactionModule {}
