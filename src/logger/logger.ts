import winston, { Logger as WinstonLogger, transports } from 'winston';

class Logger extends WinstonLogger{
    private static instance: Logger;

    private constructor() {
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

        Logger.instance = logger;
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            new Logger();
        }

        return Logger.instance;
    }
}


const logger = Logger.getInstance();
export default logger;


