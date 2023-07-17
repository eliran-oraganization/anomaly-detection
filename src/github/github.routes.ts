import { Request, Response, Router } from 'express';
import { PushPayload, RepositoryPayload, CreateTeamPayload } from './actions.interface';
import PrefixChecker from '../detectors/prefix-checker';
import WithinXMinutes from '../detectors/within-x-minutes';
import IsBetweenHours from '../detectors/is-push-between-hours';
import SuspiciousEvents from './events/suspicious-events';


class GitHubWebhooks {
    public readonly router = Router();
    private readonly teamsSuspiciousEvents = new SuspiciousEvents<CreateTeamPayload>()
    private readonly repositorySuspiciousEvents = new SuspiciousEvents<RepositoryPayload>()
    private readonly pushSuspiciousEvents = new SuspiciousEvents<PushPayload>()

    constructor() {
        this.initializeRoutes();
        this.initializeDetectors();
    }

    private initializeDetectors() {
        this.teamsSuspiciousEvents.addDetectors([new PrefixChecker()]);
        this.repositorySuspiciousEvents.addDetectors([new WithinXMinutes()]);
        this.pushSuspiciousEvents.addDetectors([new IsBetweenHours()]);
    }

    initializeRoutes(): void {
        this.router.post('/teams', (request: Request, response: Response) => {
            const body: CreateTeamPayload = request.body;
            this.teamsSuspiciousEvents.onEvent(body);
            return response.json({});
        });
        this.router.post('/repositories', (request: Request, response: Response) => {
            const body: RepositoryPayload = request.body;
            this.repositorySuspiciousEvents.onEvent(body);
            return response.json({});
        });
        this.router.post('/push', (request: Request, response: Response) => {
            const body: PushPayload = request.body;
            this.pushSuspiciousEvents.onEvent(body);
            return response.json({});
        });
    }
}

export default GitHubWebhooks;