import { PaymentRequest } from '../../representations/request/payment.request';
import { PaymentRequestReady } from '../payment.request.ready';

export interface PrepareOperation {
    prepare(request: PaymentRequest): PaymentRequestReady;
}
