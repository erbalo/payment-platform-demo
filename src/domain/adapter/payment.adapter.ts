import { PaymentRequest } from "../../representations/request/payment.request";
import { GatewayProxy } from "../gateway.proxy";
import { PaymentRequestReady } from "../payment.request.ready";
import { ProxyTransaction } from "../proxy.transaction";
import { GenericAdapter } from "./generic.adapter";

export abstract class PaymentAdapter {

    constructor(
        private genericAdapter: GenericAdapter,
        private proxy: GatewayProxy
    ) { }

    abstract preparePayment(request: PaymentRequest): PaymentRequestReady;

    abstract pay(paymentReady: PaymentRequestReady): ProxyTransaction

}