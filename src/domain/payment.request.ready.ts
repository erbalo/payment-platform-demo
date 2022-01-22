import { OrderRepresentation } from "../representations/order.representation";
import { ProxyComponent } from "./proxy.component";

export interface PaymentRequestReady {
    amount: number
    proxy: ProxyComponent
    order: OrderRepresentation
}