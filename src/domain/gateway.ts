import Logger from '../commons/logger';
import { PaymentRequest } from '../representations/request/payment.request'
import { AdapterFactory } from './adapter/adapter.factory';
import { PaymentAdapter } from './adapter/payment.adapter';
import { PaymentRequestReady } from './payment.request.ready';
import { ProxyTransaction } from './proxy.transaction';

export class Gateway {

    constructor(
        private adapterFactory: AdapterFactory
    ) { }

    preparePayment(paymentRequest: PaymentRequest): PaymentRequestReady {
        const adapter: PaymentAdapter = this.adapterFactory.instance(paymentRequest.proxy);
        return adapter.preparePayment(paymentRequest);
    }

    pay(paymentReady: PaymentRequestReady): ProxyTransaction {
        const adapter: PaymentAdapter = this.adapterFactory.instance(paymentReady.proxy);
        return adapter.pay(paymentReady);
    }

}