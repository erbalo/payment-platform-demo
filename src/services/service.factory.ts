import { Gateway } from '../domain/gateway'
import { RepositoryLoader } from '../interfaces/repository.loader.interface'
import { ServiceLoader } from '../interfaces/service.loader.interface'
import { PaymentService } from './payment.service'

export class ServiceFactory {

    constructor(
        private repositoryLoaders: RepositoryLoader,
        private gateway: Gateway
    ) { }

    loaders = (): ServiceLoader => {
        const paymentService = new PaymentService(this.repositoryLoaders.transactionRepository, this.gateway)

        return {
            paymentService
        }
    }
}
