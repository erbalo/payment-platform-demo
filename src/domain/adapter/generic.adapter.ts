import { PaymentRequest } from '../../representations/request/payment.request';
import { GatewayProxy } from '../gateway.proxy';
import { PaymentOperation } from '../operation/payment.operation';
import { PrepareOperation } from '../operation/prepare.operation';
import { PaymentRequestReady } from '../payment.request.ready';
import { ProxyTransaction } from '../proxy.transaction';

export class GenericAdapter {
    prepareOn(proxy: GatewayProxy): PrepareOperation {
        return {
            prepare: request => this.prepare(request, proxy),
        };
    }

    payOn(proxy: GatewayProxy): PaymentOperation {
        return {
            pay: paymentReady => this.pay(paymentReady, proxy),
        };
    }

    private prepare(request: PaymentRequest, proxy: GatewayProxy): PaymentRequestReady {
        return proxy.prepare(request);
    }

    private pay(paymentReady: PaymentRequestReady, proxy: GatewayProxy): ProxyTransaction {
        return proxy.pay(paymentReady);
    }
}
