import { TransactionStatus } from "../../generated/prisma/enums.js";

export class Transaction {
    id: number;
    
    amount: number;
    
    status: TransactionStatus;

    originWalletId: number;

    destinationWalletId: number;

    createdAt: Date;

    updatedAt: Date;
}
