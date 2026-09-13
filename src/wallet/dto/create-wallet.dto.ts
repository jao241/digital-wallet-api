import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWalletDto {
    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
