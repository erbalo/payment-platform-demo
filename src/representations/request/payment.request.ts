import { ProxyComponent } from '../../domain/proxy.component';
import { OrderRepresentation } from '../order.representation';

export interface PaymentRequest {
    proxy: ProxyComponent;
    order: OrderRepresentation;
}
