import { DynamoConfiguration } from '../configurations/dynamo.configuration';
import { RabbitMQConfiguration } from '../configurations/rabbitmq.configuration'

export interface ConfigurationLoader {
    rabbitConfiguration: RabbitMQConfiguration
    dynamoConfiguraion: DynamoConfiguration
}
