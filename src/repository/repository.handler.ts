import { DataMapper } from '@aws/dynamodb-data-mapper';
import { RepositoryLoader } from '../interfaces/repository.loader.interface';
import { TransactionRepository } from './transaction.repository';

export class RepositoryHandler {
    constructor(private mapper: DataMapper) {}

    loaders(): RepositoryLoader {
        const transactionRepository = new TransactionRepository(this.mapper);

        return {
            transactionRepository,
        };
    }
}
