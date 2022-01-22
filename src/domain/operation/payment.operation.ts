import { PaymentRequestReady } from "../payment.request.ready";
import { ProxyTransaction } from "../proxy.transaction";

export interface PaymentOperation {

    pay(paymentReady: PaymentRequestReady): ProxyTransaction;

}