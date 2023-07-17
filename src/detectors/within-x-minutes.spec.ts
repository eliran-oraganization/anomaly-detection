import { RepositoryPayload } from "../github/actions.interface";
import WithinXMinutes from "./within-x-minutes";


describe('Repositories events', () => {
    const detector = new WithinXMinutes();

    it('Should return true if diff between start-date and end-date is less than allowed minimum diff in minutes', () => {
        const situations: RepositoryPayload[] = [
            { action: 'deleted', repository: { created_at: '10/10/2023 12:00', updated_at: '10/10/2023 12:09' } },
            { action: 'deleted', repository: { created_at: '10/10/2023 12:00', updated_at: '10/10/2023 12:01' } },
            { action: 'deleted', repository: { created_at: '10/10/2023 12:00', updated_at: '10/10/2023 12:05' } }
        ]
        situations.forEach(situation => expect(detector.detect(situation)
        ).toBe(true));
    });
    it('Should return false if diff between start-date and end-date is bigger than allowed minimum diff in minutes', () => {
        const situations: RepositoryPayload[] = [
            { action: 'created', repository: { created_at: '10/10/2023 12:00', updated_at: '10/10/2023 12:08' } },
            { action: 'deleted', repository: { created_at: '10/10/2023 12:00', updated_at: '10/10/2023 12:11' } },
            { action: 'deleted', repository: { created_at: '10/10/2023 12:00', updated_at: '10/10/2023 13:05' } }
        ]
        situations.forEach(situation => expect(detector.detect(situation)).toBe(false));
    })
})