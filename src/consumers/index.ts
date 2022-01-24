import { RabbitConnection } from '../interfaces/rabbit.connection.interface';
import { ServiceLoader } from '../interfaces/service.loader.interface';
import { ConsumerHandler } from './consumer.handler';

const consumerBinding = (serviceLoader: ServiceLoader, conection: RabbitConnection) => {
    const handler = new ConsumerHandler(serviceLoader, conection);
    const queueBindings = handler.queues();

    queueBindings.forEach(async queue => {
        await queue.bind();
    });
};

export default consumerBinding;
