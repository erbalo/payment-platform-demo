import { AdapterFactory } from './adapter.factory';
import { GenericAdapter } from './generic.adapter';
import { PaypalAdapter } from './paypal/paypal.adapter';
import { PaypalGatewayProxy } from './paypal/paypal.gateway.proxy';

const genericAdapter = new GenericAdapter();
const paypalProxy = new PaypalGatewayProxy();
const paypalAdapter = new PaypalAdapter(genericAdapter, paypalProxy);

const adapterFactory = new AdapterFactory(paypalAdapter);

export default adapterFactory;
