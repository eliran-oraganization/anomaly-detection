import { NextFunction, Request, Response } from 'express';
import express, { Application } from 'express';
import logger from './logger/logger';
import { HttpCode } from './exceptions/app-error';
import GitHubWebhooks from './github/github.routes';


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
        const githubWebhooksRouter = new GitHubWebhooks();
        this.app.use('/events/github/', githubWebhooksRouter.router);
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