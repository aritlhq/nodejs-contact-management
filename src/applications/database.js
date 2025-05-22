// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../../generated/prisma/index.js'
import { logger } from "./logging.js";

export const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

prisma.$on('query', (e) => {
    logger.info(e);
});

prisma.$on('error', (e) => {
    logger.error(e);
});

prisma.$on('info', (e) => {
    logger.info(e);
});

prisma.$on('warn', (e) => {
    logger.warn(e);
});
