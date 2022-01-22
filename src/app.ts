import express from 'express'
import expressReqId from 'express-request-id'
import morgan_middleware from './middlewares/morgan.middleware'
import configurationLoaders from './configurations'
import { ConfigurationLoader } from './interfaces/configuration.loader.interface'
import consumerBinding from './consumers'
import { repositoryBinding } from './repository'
import getLogger from './commons/logger'
import { RepositoryLoader } from './interfaces/repository.loader.interface'
import { serviceBindig } from './services'
import { ServiceLoader } from './interfaces/service.loader.interface'

const Logger = getLogger(module);

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.init()
    }

    private init(): void {
        this.middleware();
        (async () => {
            await this.configuration()
        })();
    }

    private middleware(): void {
        const addRequestId = expressReqId()
        this.express.get("/health", (req, res) => {
            res.status(200).send()
        })
        this.express.use(addRequestId)
        this.express.use(morgan_middleware)
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
    }

    private async configuration(): Promise<void> {
        let configurations: ConfigurationLoader;
        try {
            configurations = await configurationLoaders;
        } catch (error) {
            console.error("Xss", error)
            process.exit(1)
        }

        if (configurations) {
            const mapper = configurations.dynamoConfiguraion.getMapper();
            Logger.info('Dynamo connection');
            const repositoryLoader: RepositoryLoader = repositoryBinding(mapper);
            Logger.info('Repository loader');
            const serviceLoader: ServiceLoader = serviceBindig(repositoryLoader);
            Logger.info('Service loader');
            const rabbitConnection = configurations.rabbitConfiguration.getConnection()
            Logger.info('Rabbit connection');
            consumerBinding(serviceLoader, rabbitConnection);
        }

    }
}

export default new App().express
