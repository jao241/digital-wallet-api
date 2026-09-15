import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TransferAmountDto } from './dto/transfer-amount.dto.js';
import { TransactionStatus } from '../generated/prisma/enums.js';
import { TransactionRepository } from './transaction-repository/transaction-repository.js';
import { WalletRepository } from '../wallet/wallet-repository/wallet-repository.js';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  async transfer(transferAmountDto: TransferAmountDto) {
    const originWallet = await this.walletRepository.findByUserId(
      transferAmountDto.originWalletUserId,
    );

    if (!originWallet) {
      throw new NotFoundException('Origin wallet not found');
    }

    const destinationWallet = await this.walletRepository.findByUserId(
      transferAmountDto.destinationWalletUserId,
    );

    if (!destinationWallet) {
      throw new NotFoundException('Destination wallet not found');
    }

    if (originWallet.id === destinationWallet.id) {
      throw new ConflictException(
        'Origin and destination wallets must be different',
      );
    }

    if (originWallet.balance < transferAmountDto.amount) {
      throw new ConflictException(
        'The amount passed is higher than the wallet balance',
      );
    }

    return await this.transactionRepository.transfer({
      amount: transferAmountDto.amount,
      destinationWalletId: destinationWallet.id,
      originWalletId: originWallet.id,
      status: TransactionStatus.COMPLETED
    });
  }

  async reverse(id: number) {
    const transaction = await this.transactionRepository.findOne(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.status !== TransactionStatus.COMPLETED) {
      throw new ConflictException(
        'Only completed transactions can be reversed',
      );
    }

    const originWallet = await this.walletRepository.findOne(
      transaction.originWalletId,
    );

    if (!originWallet) {
      throw new NotFoundException('Origin wallet not found');
    }

    const destinationWallet = await this.walletRepository.findOne(
      transaction.destinationWalletId,
    );

    if (!destinationWallet) {
      throw new NotFoundException('Destination wallet not found');
    }

    if (destinationWallet.balance < transaction.amount) {
      throw new ConflictException(
        'The destination wallet does not have enough balance to reverse the transaction',
      );
    }
    
    return await this.transactionRepository.reverse(transaction.id);
  }
}