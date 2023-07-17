import { Request, Response } from 'express';
import BaseRouter from "../routes/router.base";
import PushSuspiciousEvents from './events/suspicious-events/push.events';
import logger from '../logger/logger';
import { PushPayload, RepositoryPayload, CreateTeamPayload } from './actions.interface';
import RepositorySuspiciousEvents from './events/suspicious-events/repositories.events';
import TeamsSuspiciousEvents from './events/suspicious-events/teams.events';
import PrefixChecker from '../detectors/prefix-checker';
import WithinXMinutes from '../detectors/within-x-minutes';
import IsBetweenHours from '../detectors/is-push-between-hours';


class GitHubWebhooks extends BaseRouter {
    private readonly teamsSuspiciousEvents = new TeamsSuspiciousEvents()
    private readonly repositorySuspiciousEvents = new RepositorySuspiciousEvents()
    private readonly pushSuspiciousEvents = new PushSuspiciousEvents()

    constructor() {
        super();
        this.teamsSuspiciousEvents.addDetectors([new PrefixChecker()]);
        this.repositorySuspiciousEvents.addDetectors([new WithinXMinutes()]);
        this.pushSuspiciousEvents.addDetectors([new IsBetweenHours()]);
    }

    initializeRoutes(): void {
        this.router.post('/teams', (request: Request, response: Response) => {
            const body: CreateTeamPayload = request.body;
            logger.info(`teams event action is: - ${body.action}`);
            this.teamsSuspiciousEvents.onEvent(request.body);
            return response.json({});
        });
        this.router.post('/repositories', (request: Request, response: Response) => {
            const body: RepositoryPayload = request.body;
            logger.info(`repository event action is: - ${body.action}`);
            this.repositorySuspiciousEvents.onEvent(body);
            return response.json({});
        });
        this.router.post('/push', (request: Request, response: Response) => {
            const body: PushPayload = request.body;
            logger.info(`push code at: - ${new Date(body.repository.pushed_at * 1000)}`);
            this.pushSuspiciousEvents.onEvent(body);
            return response.json({});
        });
    }
}

export default GitHubWebhooks;