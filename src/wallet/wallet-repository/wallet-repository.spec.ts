import { Test, TestingModule } from '@nestjs/testing';
import { WalletRepository } from './wallet-repository.js';

describe('WalletRepository', () => {
  let provider: WalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletRepository],
    }).compile();

    provider = module.get<WalletRepository>(WalletRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
