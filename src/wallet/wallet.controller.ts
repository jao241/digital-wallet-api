import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { WalletService } from './wallet.service.js';
import { UpdateWalletDto } from './dto/update-wallet.dto.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @ApiOperation({
    summary: 'Atualizar valor na carteira de um usuário pelo ID da carteira',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a carteira com o valor atualizado',
  })
  @ApiResponse({
    status: 400,
    description: 'Parametro id no formato incorreto, tipo numerico esperado',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletService.update(id, updateWalletDto.balance);
  }
}
