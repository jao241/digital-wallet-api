import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet-repository/wallet-repository.js';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}
  async findOne(id: number) {
    return await this.walletRepository.findOne(id);
  }

  async update(id: number, amount: number) {
    return await this.walletRepository.updateAmount(id, amount);
  }
}
