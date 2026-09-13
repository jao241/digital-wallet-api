import { TransactionStatus } from "../../generated/prisma/enums";

export class Transaction {
    id: number;
    
    amount: number;
    
    status: TransactionStatus;

    originWalletId: number;

    destinationWalletId: number;

    createdAt: Date;

    updatedAt: Date;
}
