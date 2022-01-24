import { PaymentService } from '../services/payment.service';

export interface ServiceLoader {
    paymentService: PaymentService;
}
