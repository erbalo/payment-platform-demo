import app from './app'

import * as http from 'http'

import { normalizePort, onListening, onError } from './utils/util'
const server = http.createServer(app)

const port = normalizePort(8001);

(async () => {
    server.listen(port)
    server.on('error', onError(server, port))
    server.on('listening', onListening(server))
})()
