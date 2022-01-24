import { ConfigurationHandler } from './configuration.handler';

const configurationHandler = new ConfigurationHandler();
const configurationLoaders = configurationHandler.loaders();

export default configurationLoaders;
