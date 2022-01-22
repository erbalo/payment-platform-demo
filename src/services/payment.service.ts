import getLogger from "../commons/logger";
import { Gateway } from "../domain/gateway";
import { PaymentRequestReady } from "../domain/payment.request.ready";
import { ProxyTransaction } from "../domain/proxy.transaction";
import { TransactionRepository } from "../repository/transaction.repository";
import { PaymentRequest } from "../representations/request/payment.request";

const Logger = getLogger(module);

export class PaymentService {

    constructor(
        private transactionRepository: TransactionRepository,
        private gateway: Gateway
    ) { }

    async pay(request: PaymentRequest): Promise<ProxyTransaction> {
        const requestReady: PaymentRequestReady = this.gateway.preparePayment(request);
        Logger.info("Request ready", JSON.stringify(requestReady));
        const transaction: ProxyTransaction = this.gateway.pay(requestReady);
        Logger.info("Transaction to save", JSON.stringify(transaction))

        await this.transactionRepository.create(transaction)
        return transaction;
    }
}