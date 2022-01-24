import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

export class DynamoConfiguration {
    private mapper: DataMapper;

    init(): DynamoConfiguration {
        const dynamoDBOptions: DynamoDB.ClientConfiguration = {
            region: 'us-east-1',
            endpoint: 'http://localhost:8000',
        };

        const client = new DynamoDB(dynamoDBOptions);
        this.mapper = new DataMapper({ client });

        return this;
    }

    getMapper() {
        return this.mapper;
    }
}
