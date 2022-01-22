import { PaymentRequest } from "../representations/request/payment.request";
import { PaymentRequestReady } from "./payment.request.ready";
import { ProxyTransaction } from "./proxy.transaction";

export interface GatewayProxy {

    prepare(request: PaymentRequest): PaymentRequestReady;
    pay(paymentReady: PaymentRequestReady): ProxyTransaction;

}