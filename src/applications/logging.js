import winston from "winston/lib/winston/config";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
});