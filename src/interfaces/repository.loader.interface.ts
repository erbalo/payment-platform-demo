import { TransactionRepository } from '../repository/transaction.repository';

export interface RepositoryLoader {
    transactionRepository: TransactionRepository;
}
