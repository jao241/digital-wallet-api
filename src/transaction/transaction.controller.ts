import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TransferAmountDto } from './dto/transfer-amount.dto.js';
import { TransactionService } from './transaction.service.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'Realizar transferencia entre duas carteiras',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a transação gerada',
  })
  @Post()
  async create(@Body() transferAmountDto: TransferAmountDto) {
    return await this.transactionService.transfer(transferAmountDto);
  }

  @ApiOperation({
    summary: 'Reverter uma transação realizada',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a nova transação gerada',
  })
  @ApiResponse({
    status: 400,
    description: 'Parametro id no formato incorreto, tipo numerico esperado',
  })
  @Post('/reverse/:id')
  async reverseTransaction(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionService.reverse(id);
  }
}
