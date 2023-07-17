import winston, { Logger as WinstonLogger, transports } from 'winston';

class Logger extends WinstonLogger{
    constructor() {
        super();

        const logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
                })
            ),
            transports: [
                new transports.Console()
            ]
        });
    }
}


const logger = new Logger();
export default logger;


