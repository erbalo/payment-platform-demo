import { ProxyComponent } from "./proxy.component";

export interface ProxyTransaction {
    orderId: number
    amount: number
    proxy: ProxyComponent
    reference: string
}