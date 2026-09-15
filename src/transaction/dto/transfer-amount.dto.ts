import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionStatus } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class TransferAmountDto {
  @ApiProperty({
    example: 2000,
    description: 'Valor da transação, em centavos',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'COMPLETED',
    description: 'Status da transação, COMPLETED por padrão',
  })
  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: string;

  @ApiProperty({
    example: 1,
    description: 'ID da carteira de origem a ser removido o valor da transação',
  })
  @IsNotEmpty()
  @IsNumber()
  originWalletUserId: number;

  @ApiProperty({
    example: 2,
    description: 'ID da carteira de destino a receber o valor da transação',
  })
  @IsNotEmpty()
  @IsNumber()
  destinationWalletUserId: number;
}
