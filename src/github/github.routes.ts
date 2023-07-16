import { Request, Response } from 'express';
import BaseRouter from "../routes/router.base";
import PushSuspiciousEvents from './events/suspicious-events/push.events';
import logger from '../logger/logger';
import { PushPayload, RepositoryPayload, CreateTeamPayload } from './actions.interface';
import RepositorySuspiciousEvents from './events/suspicious-events/repositories.events';
import TeamsSuspiciousEvents from './events/suspicious-events/teams.events';


class GitHubWebhooks extends BaseRouter {

    initializeRoutes(): void {
        this.router.post('/teams', (request: Request, response: Response) => {
            const body: CreateTeamPayload = request.body;
            logger.info(`teams event action is: - ${body.action}`);

            const teamsSuspiciousEvents = new TeamsSuspiciousEvents();
            teamsSuspiciousEvents.onEvent(request.body);

            return response.send({});
        });
        this.router.post('/repositories', (request: Request, response: Response) => {
            const body: RepositoryPayload = request.body;
            logger.info(`repository event action is: - ${body.action}`);

            const repositorySuspiciousEvents = new RepositorySuspiciousEvents();
            repositorySuspiciousEvents.onEvent(body);
            return response.send({});
        });
        this.router.post('/push', (request: Request, response: Response) => {
            const body: PushPayload = request.body;
            logger.info(`push code at: - ${new Date(body.repository.pushed_at * 1000)}`);

            const pushSuspiciousEvents = new PushSuspiciousEvents();
            pushSuspiciousEvents.onEvent(body);
            return response.send({});
        });
    }


}

export default GitHubWebhooks;