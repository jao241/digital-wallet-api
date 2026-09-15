import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWalletDto {
    @ApiProperty({
        example: 20000,
        description: "Valor na carteira, em centavos. R$ 200,00 em centavos no exemplo"
    })
    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @ApiProperty({
        example: "1",
        description: "ID do usuário relacionado a carteira."
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
