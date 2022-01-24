import { AmqpRpcProducer } from 'amq-rpc-core';
import getLogger from '../commons/logger';
import { QueueBinding } from '../interfaces/queue.binding.interface';
import { RabbitConnection } from '../interfaces/rabbit.connection.interface';
import { PaymentRequest } from '../representations/request/payment.request';
import { PaymentService } from '../services/payment.service';

const Logger = getLogger(module);

export class CreateConsumer implements QueueBinding {
    constructor(
        private rabbitConnection: RabbitConnection,
        private queue: string,
        private paymentService: PaymentService,
    ) {}

    delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    async bind(): Promise<void> {
        await this.rabbitConnection.channel.assertQueue(this.queue, {
            deadLetterRoutingKey: this.queue + '.expired',
            deadLetterExchange: this.queue + '.direct',
            messageTtl: 15000,
            durable: true,
        });

        const producer = new AmqpRpcProducer(this.rabbitConnection.connection, {
            requestsQueue: this.queue,
        });

        producer.registerListener(async request => {
            Logger.info('Request to process:', JSON.stringify(request));
            let paymentRequest: PaymentRequest = null;
            try {
                paymentRequest = request as PaymentRequest;
            } catch (e) {
                Logger.error(e);
            }

            const transaction = await this.paymentService.pay(paymentRequest);
            return {
                status_code: 201,
                data: transaction,
                message: 'Serch el bailador',
            };
        });

        await producer.start();
    }
}
