import { PaymentRequest } from '../../representations/request/payment.request';
import { GatewayProxy } from '../gateway.proxy';
import { PaymentRequestReady } from '../payment.request.ready';
import { ProxyTransaction } from '../proxy.transaction';
import { GenericAdapter } from './generic.adapter';
import { PaymentAdapter } from './payment.adapter';

export abstract class GatewayAdapter extends PaymentAdapter {
    protected constructor(private generic: GenericAdapter, private gatewayProxy: GatewayProxy) {
        super(generic, gatewayProxy);
    }

    preparePayment(request: PaymentRequest): PaymentRequestReady {
        return this.generic.prepareOn(this.gatewayProxy).prepare(request);
    }

    pay(paymentReady: PaymentRequestReady): ProxyTransaction {
        return this.generic.payOn(this.gatewayProxy).pay(paymentReady);
    }
}
