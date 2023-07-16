import { NextFunction, Request, Response } from 'express';
import express, { Application } from 'express';
import logger from './logger/logger';
import EventRoutes from './routes/routes';
import { HttpCode } from './exceptions/app-error';


class App {

    public app: Application;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        this.configureRoutes();
    }

    configureRoutes() {
        const eventsRoute = new EventRoutes();
        this.app.use('/events/', eventsRoute.router);
        this.app.use((error: Error, _: Request, response: Response, next: NextFunction) => {
            if (process.env.NODE_ENV !== 'production') {
                logger.error(error.message, error.stack)
                response.json({
                    message: error.message,
                    stackTrace: error.stack
                }).status(HttpCode.INTERNAL_SERVER_ERROR)
            } else {
                logger.error(error.message)
                response.json({
                    message: error.message,
                }).status(HttpCode.INTERNAL_SERVER_ERROR)
            }
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is listening on port ${this.port}`);
        })
    }

}

export default App;