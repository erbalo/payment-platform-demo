import winston from 'winston'
import util from 'util'
import path from 'path'
import * as Transport from 'winston-transport';
import { Format } from 'logform';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    return env == 'development' ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'gray',
    debug: 'blue'
}

winston.addColors(colors);

function transform(info, opts) {
    const args = info[Symbol.for('splat')];
    if (args) { info.message = util.format(info.message, ...args); }
    return info;
}

function utilFormatter() { return { transform }; }

const buildFormat = (path: string): Format => {
    return winston.format.combine(
        winston.format(info => ({ ...info, level: info.level.toUpperCase() }))(),
        winston.format.label({ label: path }),
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss.ms' }),
        winston.format.colorize({ all: true }),
        utilFormatter(),
        winston.format.printf((info) => {
            return `${info.timestamp} [${info.level}] [${info.label}]: ${info.message}`
        })
    )
}

const getLabel = function (callingModule) {
    const parts = callingModule.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
}

const buildTransports = (): Transport[] => {
    return [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error'
        }),
        new winston.transports.File({ filename: 'logs/all.log' })
    ]
}

const getLogger = (callingModule) => {
    const path = getLabel(callingModule)

    return winston.createLogger({
        exitOnError: false,
        level: level(),
        levels,
        format: buildFormat(path),
        transports: buildTransports()
    })
}

export default getLogger;