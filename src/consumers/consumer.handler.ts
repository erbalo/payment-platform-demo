import { QueueBinding } from '../interfaces/queue.binding.interface';
import { RabbitConnection } from '../interfaces/rabbit.connection.interface';
import { ServiceLoader } from '../interfaces/service.loader.interface';
import { CreateConsumer } from './create.consumer';

export class ConsumerHandler {
    constructor(private serviceLoader: ServiceLoader, private rabbitConnection: RabbitConnection) {}

    queues = (): QueueBinding[] => {
        const createConsumer = new CreateConsumer(
            this.rabbitConnection,
            'edu.payment.platform.create',
            this.serviceLoader.paymentService,
        );

        return [createConsumer];
    };
}
