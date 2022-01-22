import { Gateway } from "./gateway"
import adapterFactory from './adapter'

let gateway = null;

if (!gateway) {
    gateway = new Gateway(adapterFactory);
}

export default gateway;