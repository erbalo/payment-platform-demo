import { DataMapper } from "@aws/dynamodb-data-mapper";
import getLogger from "../commons/logger";
import { ProxyTransaction } from "../domain/proxy.transaction";
import { Transaction } from "../entity/transaction.entity";

const Logger = getLogger(module);

export class TransactionRepository {

    constructor(
        private mapper: DataMapper
    ) { }

    async create(proxyTransaction: ProxyTransaction): Promise<void> {
        const transaction = new Transaction();
        transaction.amount = proxyTransaction.amount;
        transaction.order_id = proxyTransaction.orderId;
        transaction.proxy = proxyTransaction.proxy.toString()
        transaction.reference = proxyTransaction.reference;

        try{
            const res = await this.mapper.put(transaction);
            Logger.info("Result", JSON.stringify(res));
        }catch(e){
            Logger.error(e)
        }
        
    }

}