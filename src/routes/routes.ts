import BaseRouter from "./router.base";
import GitHubWebhooks from "../github/github.routes";
import logger from "../logger/logger";


class EventRoutes extends BaseRouter {

    initializeRoutes(): void {
        logger.info(`Initialized GitHub routes`)
        const githubRouter = new GitHubWebhooks();
        this.router.use('/github/', githubRouter.router);
    }
}

export default EventRoutes;