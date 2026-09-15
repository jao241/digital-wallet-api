import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service.js';
import { WalletRepository } from './wallet-repository/wallet-repository.js';
import { WalletController } from './wallet.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, PassportModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule {}
