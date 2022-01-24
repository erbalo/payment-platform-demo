import { ProxyComponent } from '../proxy.component';
import { PaymentAdapter } from './payment.adapter';
import { PaypalAdapter } from './paypal/paypal.adapter';

export class AdapterFactory {
    constructor(private paypalAdapter: PaypalAdapter) {}

    instance(proxy: ProxyComponent): PaymentAdapter {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const component: ProxyComponent = (<any>ProxyComponent)[proxy];

        switch (component) {
            case ProxyComponent.PAYPAL:
                return this.paypalAdapter;
            case ProxyComponent.STRIPE:
                return null;
        }
    }
}
