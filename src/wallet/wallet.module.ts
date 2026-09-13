import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service.js';
import { WalletController } from './wallet.controller.js';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
