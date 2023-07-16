import request from 'supertest'
import App from '../app'
import { CreateTeamPayload, PushPayload, RepositoryPayload } from './actions.interface';



describe('GitHub Events', () => {

    const app = new App(3000).app;

    describe('Teams events', () => {
        it('When create a team with name that not include the hacker prefix should not detect suspicious behavior', async () => {

            const teamBody: CreateTeamPayload[] = [
                { action: 'created', team: { name: 'abchackefg' } },
                { action: 'created', team: { name: 'HACK' } },
                { action: 'created', team: { name: 'team hack' } },
                { action: 'created', team: { name: 'new hack team' } }
            ]
            const responses = await Promise.all(
                teamBody.map(async body => {
                    return request(app)
                        .post('/events/github/teams')
                        .send(body)
                        .expect(200);
                })
            )

        })
        it('When create a team with name that include the hacker prefix should detect suspicious behavior', async () => {

            const teamBody: CreateTeamPayload[] = [
                { action: 'created', team: { name: 'hacker' } },
                { action: 'created', team: { name: 'HACKer' } },
                { action: 'created', team: { name: 'team hacker' } },
                { action: 'created', team: { name: 'new hack team hacker' } }
            ]
            const responses = await Promise.all(
                teamBody.map(async body => {
                    return request(app)
                        .post('/events/github/teams')
                        .send(body)
                        .expect(200);
                })
            );

        })
    });

    describe('Repository events', () => {

        it('Should not detect suspicious behavior if repository deleted more than 10 minutes after created', async () => {

            const requestBody: RepositoryPayload[] = [
                { action: 'deleted', repository: { created_at: '02/02/2023 10:00', updated_at: '02/02/2024 10:09' } },
                { action: 'deleted', repository: { created_at: '02/01/2023 10:00', updated_at: '02/02/2023 10:02' } },
                { action: 'created', repository: { created_at: '02/02/2023 10:00', updated_at: '02/02/2023 10:00' } },
            ]
            const responses = await Promise.all(
                requestBody.map(async body => {
                    return request(app)
                        .post('/events/github/repositories')
                        .send(body)
                        .expect(200);
                })
            );

        })
        it('Should detect suspicious behavior when repository deleted 10 minutes after created', async () => {

            const requestBody: RepositoryPayload[] = [
                { action: 'deleted', repository: { created_at: '02/02/2023 10:00', updated_at: '02/02/2023 10:09' } },
                { action: 'deleted', repository: { created_at: '02/01/2023 10:00', updated_at: '02/01/2023 10:02' } },
                { action: 'deleted', repository: { created_at: '02/02/2023 10:00', updated_at: '02/02/2023 10:00' } },
            ]
            const responses = await Promise.all(
                requestBody.map(async body => {
                    return request(app)
                        .post('/events/github/repositories')
                        .send(body)
                        .expect(200);
                })
            );

        })

    })

    describe('Push event', () => {
        it('Should detect suspicious behavior when push is between 14:00 - 16:00', async () => {

            const requestBody: PushPayload[] = [
                { repository: { pushed_at: new Date('02/01/2023 14:00').getTime() / 1000 } },
                { repository: { pushed_at: new Date('02/01/2023 15:00').getTime() / 1000 } },
                { repository: { pushed_at: new Date('02/01/2023 15:59').getTime() / 1000 } },
            ]
            const responses = await Promise.all(
                requestBody.map(async body => {
                    return request(app)
                        .post('/events/github/push')
                        .send(body)
                        .expect(200);
                })
            );
        })

        it('Should not detect suspicious behavior when push is not between 14:00 - 16:00', async () => {

            const requestBody: PushPayload[] = [
                { repository: { pushed_at: new Date('02/01/2023 13:59').getTime() / 1000 } },
                { repository: { pushed_at: new Date('02/01/2023 13:00').getTime() / 1000 } },
                { repository: { pushed_at: new Date('02/01/2023 16:01').getTime() / 1000 } },
                { repository: { pushed_at: 1689428705 } },
            ]
            const responses = await Promise.all(
                requestBody.map(async body => {
                    return request(app)
                        .post('/events/github/push')
                        .send(body)
                        .expect(200);
                })
            );
        })
    })

})