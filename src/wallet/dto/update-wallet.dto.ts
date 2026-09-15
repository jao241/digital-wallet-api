import { OmitType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto.js';

export class UpdateWalletDto extends OmitType(CreateWalletDto, ["userId"] as const) {}
