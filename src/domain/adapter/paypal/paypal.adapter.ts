import { GatewayAdapter } from "../gateway.adapter";
import { GenericAdapter } from "../generic.adapter";
import { PaypalGatewayProxy } from "./paypal.gateway.proxy";

export class PaypalAdapter extends GatewayAdapter {

    constructor(
        private adapter: GenericAdapter,
        private paypalProxy: PaypalGatewayProxy
    ) {
        super(adapter, paypalProxy);
    }

}