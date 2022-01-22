import { Server } from "http"
import * as http from "http"
import getLogger from "../commons/logger"

const Logger = getLogger(module);

type returnValue = number | string | boolean

export const normalizePort = (value: number | string): returnValue => {
    let port: number = typeof value === "string" ? parseInt(value) : value
    if (isNaN(port)) return value
    else if (port >= 0) return port
    else return false
}

export const onError = (server: Server, serverPort: any) => {
    return (error: any): void => {
        let port = serverPort
        if (error.syscall !== "listen") throw error
        let bind = typeof port === "string" ? `pipe ${port}` : `port ${port}`
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requieres elevated privileges`)
                process.exit(1)
                break
            case "EADDRINUSE":
                console.error(`${bind} is already in use`)
                process.exit(1)
                break
            default:
                throw error
        }
    }
}

export const onListening = (server: http.Server) => {
    return (): void => {
        let address = server.address()
        let bind =
            typeof address === "string" ? `pipe ${address}` : `port ${address.port}`
        Logger.info(`Listening at ${bind}`)
    }
}
