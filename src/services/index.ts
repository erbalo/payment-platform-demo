import { ServiceFactory } from "./service.factory"
import gateway from "../domain"
import { RepositoryLoader } from "../interfaces/repository.loader.interface";
import { ServiceLoader } from "../interfaces/service.loader.interface";

let serviceFactoryInstance = null;
let serviceLoaders = null;

export const serviceBindig = (repositoryLoader: RepositoryLoader): ServiceLoader => {
    if (!serviceFactoryInstance) {
        serviceFactoryInstance = new ServiceFactory(repositoryLoader, gateway)
    }

    if (!serviceLoaders) {
        serviceLoaders = serviceFactoryInstance.loaders()
    }

    return serviceLoaders;
}

export default serviceLoaders;