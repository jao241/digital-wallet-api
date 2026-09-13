import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TransactionStatus } from "../../generated/prisma/enums";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsEnum(TransactionStatus)
    status: string;

    @IsNotEmpty()
    @IsNumber()
    originWalletId: number;
    
    @IsNotEmpty()
    @IsNumber()
    destinationWalletId: number;
}
