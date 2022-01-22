import getLogger from "../../../commons/logger";
import { PaymentRequest } from "../../../representations/request/payment.request";
import { GatewayProxy } from "../../gateway.proxy";
import { PaymentRequestReady } from "../../payment.request.ready";
import { ProxyTransaction } from "../../proxy.transaction";

const Logger = getLogger(module);

export class PaypalGatewayProxy implements GatewayProxy {

    prepare(request: PaymentRequest): PaymentRequestReady {
        Logger.info("Preparing request", JSON.stringify(request))

        const order = request.order;
        const amount = order.items.map(
            item => {
                return item.quantity * item.price
            }
        ).reduce((a, b) => a + b)

        return {
            amount: amount,
            order: order,
            proxy: request.proxy
        }
    }

    pay(paymentReady: PaymentRequestReady): ProxyTransaction {
        Logger.info("Build a transaction for order", paymentReady.order.id)

        // SDK paypl
        return {
            amount: paymentReady.amount,
            orderId: paymentReady.order.id,
            proxy: paymentReady.proxy,
            reference: 'some reference' + paymentReady.order.id
        }
    }

}