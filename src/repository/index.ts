import { DataMapper } from "@aws/dynamodb-data-mapper";
import getLogger from "../commons/logger";
import { RepositoryLoader } from "../interfaces/repository.loader.interface";
import { RepositoryHandler } from "./repository.handler";

const Logger = getLogger(module);
let repositoryLoaders: RepositoryLoader = null;

export const repositoryBinding = (mapper: DataMapper): RepositoryLoader => {
    const transactionHandler = new RepositoryHandler(mapper);

    if (!repositoryLoaders) {
        repositoryLoaders = transactionHandler.loaders()
    }

    return repositoryLoaders;
}

export default repositoryLoaders;
