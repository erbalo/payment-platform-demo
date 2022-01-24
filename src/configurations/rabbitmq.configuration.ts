import amqp, { Connection, Channel } from 'amqplib';
import { RabbitConnection } from '../interfaces/rabbit.connection.interface';

export class RabbitMQConfiguration {
    private connection: Connection;
    private channel: Channel;

    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async init(): Promise<RabbitMQConfiguration> {
        this.connection = await amqp.connect(process.env.RABBIMQ_URL || 'amqp://localhost');
        this.channel = await this.connection.createChannel();
        return this;
    }

    getConnection(): RabbitConnection {
        return {
            connection: this.connection,
            channel: this.channel,
        };
    }
}
