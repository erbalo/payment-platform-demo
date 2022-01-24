import { ConfigurationLoader } from '../interfaces/configuration.loader.interface';
import { DynamoConfiguration } from './dynamo.configuration';
import { RabbitMQConfiguration } from './rabbitmq.configuration';

export class ConfigurationHandler {
    loaders = async (): Promise<ConfigurationLoader> => {
        const rabbitConfiguration = new RabbitMQConfiguration();
        const rabbitInstance = await rabbitConfiguration.init();

        const dynamoConfiguration = new DynamoConfiguration();
        const dynamoInstance = dynamoConfiguration.init();

        return {
            rabbitConfiguration: rabbitInstance,
            dynamoConfiguraion: dynamoInstance,
        };
    };
}
